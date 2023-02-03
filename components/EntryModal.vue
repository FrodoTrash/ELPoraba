 lines (143 sloc) 4.21 KB
<template>
	<TransitionRoot :show="open">
		<!-- Dialog -->
		<Dialog as="div" class="relative z-20" @close="closeModal">
			<!-- Dialog overlay -->
			<TransitionChild
				enter="duration-200"
				leave="duration-200"
				enter-from="opacity-0"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/30 backdrop-blur" />
			</TransitionChild>

			<!-- Full-screen scrollable container -->
			<div class="fixed inset-0 overflow-y-auto">
				<!-- Container to center the panel -->
				<div class="flex items-center justify-center min-h-full p-4">
					<!-- The actual dialog panel -->
					<TransitionChild
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel class="w-full min-w-[360px] p-5 bg-white shadow-lg rounded-2xl">
							<div class="flex items-center justify-between">
								<!-- Conditional rendering for text -->
								<DialogTitle class="text-xl font-medium text-gray-700"
									> Vpisi podatke</DialogTitle
								>
							</div>
              <!-- meta text -->
							<p class="mt-1 text-sm text-gray-500">
								Podatki dneva za ID: {{ entry._id ? entry._id : 'v ustvarjanju'}}
							</p>

							<form @submit="submitEntry" class="mt-5">
								<div class="grid grid-cols-1 gap-1 md:grid-cols-1">
                  <!-- highCost -->
									<div class="col-span-1">
										<FormInput rules="required" label="Velika Poraba" type="number" step="any" name="highCost" id="highCost" />
									</div>
                  <!-- lowCost -->
									<div class="col-span-full">
										<FormInput rules="required" label="Mala Poraba" type="number" step="any" name="lowCost" id="lowCost" />
									</div>
                  <!-- temperature -->
									<div class="col-span-1">
										<FormInput rules="required" label="Temperatura" type="number" step="any" name="temp" id="temp" />
									</div>
                  <!-- solar grown -->
									<div class="col-span-1">
										<FormInput rules="required" label="Odcitan Stevec" type="number" step="any" name="counter" id="counter"/>
									</div>
									<!-- date -->
									<div class="col-span-1">
										<FormInput
											placeholder="Vnesi datum"
											rules="required"
											label="Published date"
											type="date"
											name="published"
											id="published"
										/>
											<!-- :value="new Date().toISOString().substr(0, 10)" -->
									</div>
								</div>
								<!-- Form buttons -->
								<div class="flex items-center justify-end space-x-3 mt-7">
									<button
										@click="closeModal()"
										type="button"
										class="px-4 text-sm bg-gray-100 py-2.5 rounded-md"
									>
										Cancel
									</button>
									<button type="submit" class="btn">{{ entry._id ? "Update" : "Create" }}</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionRoot,
		TransitionChild,
	} from "@headlessui/vue";
	import { useForm } from "vee-validate";
	// import dayjs from "dayjs"
	// const dons = new Date().toISOString().substr(0, 10)
	// instantiate entry store
	const entryStore = useEntryStore();
	// Initial form values
	const entry = ref({});
	// Get function used to handle form submission and set init form values
	const { handleSubmit } = useForm({
		initialValues: entry,
	});
	// Function used to update or create the record
	const submitEntry = handleSubmit(async (values, ctx) => {
		// create entry
		if (!entry.value._id) {
			await entryStore.create({ ...values })
			closeModal();
		} else {
			await entryStore.update(entry.value._id , { ...values });
			closeModal();
		}
	});

	// Controll state of the modal
	const open = ref(false);
	const openModal = (item) => {
		// Set init values if an object is passed
		if (item) {
			entry.value = JSON.parse(
				JSON.stringify({ ...item, published: item.published.substring(0, 10)})
			);
		}
		open.value = true;
	};
	const closeModal = () => {
		entry.value = {};
		open.value = false;
	};
	// Expose these methods to parent components
	defineExpose({
		openModal,
		closeModal,
	});
</script>