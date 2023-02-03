<template>
	<div class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
    <!-- search bar -->
		<div
			class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
		>
			<div class="relative w-full md:mr-10 grow">
				<span class="absolute -translate-y-1/2 top-1/2 left-3">
					<Icon name="ep:search" size="24" class="text-gray-400" />
				</span>
				<input
					placeholder="poisci vnose..."
					v-model="search"
					type="search"
					name="search"
					id="search"
					class="pl-11 input"
				/>
			</div>
			<button
				@click="entryModal.openModal()"
				class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
			>
				Dodaj
			</button>
		</div>
    <!-- table -->
		<div class="relative mt-5 border border-gray-100 rounded-lg">
			<ClientOnly>
				<EasyDataTable
					:search-value="search"
					empty-message="No entry Found"
					theme-color="#f97316"
					table-class-name="eztble"
					:headers="headers"
					:items="entryStore.entries"
				>
					<!-- puscice za low in high -->
					<template #item-lowDifference="{ lowDifference }">
						<span>
							<Icon v-if="lowDifference<0" size="16" name="fluent:arrow-down-20-regular" class="text-red-600"/>
							<Icon v-else-if="lowDifference==0"/>
							<Icon v-else size="16" name="fluent:arrow-up-20-regular" class="text-green-600"/>
							{{ lowDifference }}
						</span>
					</template>
					<template #item-highDifference="{ highDifference }">
						<span>
							<Icon v-if="highDifference<0" size="16" name="fluent:arrow-down-20-regular" class="text-red-600"/>
							<Icon v-else-if="highDifference==0"/>
							<Icon v-else size="16" name="fluent:arrow-up-20-regular" class="text-green-600"/>
							{{ highDifference }}
						</span>
					</template>
					<!-- formating date -->
					<template #item-date="{ published }">
						<span>{{ dayjs(published).format("(ddd) MMM DD, YYYY") }}</span>
					</template>
					<!-- temperatura -->
					<template #item-temp="{ temp }">
						<div>
							<span v-if="temp<0" class="text-red-600">{{ temp }} °C</span>
							<span v-else-if="temp<10" class="text-orange-400">{{ temp }} °C</span>
							<span v-else class="text-green-500">{{ temp }} °C</span>
						</div>
					</template>
					<!-- counter -->
					<template #item-counter="{ counter }">
						<span>{{ counter }} Kw</span>
					</template>
					<!-- solar formating -->
					<template #item-solarGrown="{ solarGrown }">
						<span>{{ solarGrown }} Kw</span>
						<!-- .toFixed(1) -->
					</template>
					
					<!-- Action items for table -->
					<template #item-actions="entry">
						<div class="flex space-x-4 text-gray-500">
							<button @click="entryModal.openModal(entry)">
								<Icon size="18" name="fluent:pen-24-regular" />
							</button>
							<button @click="removeEntry(entry)">
								<Icon size="18" name="fluent:delete-24-regular" />
							</button>
						</div>
					</template>
				</EasyDataTable>
			</ClientOnly>
		</div>
	</div>
	<!-- entry modal comp -->
	<EntryModal ref="entryModal" />
</template>

<script setup lang="ts">
	import { Header } from "vue3-easy-data-table";
	import dayjs from "dayjs";
  

	// entry store from pinia
	const entryStore = useEntryStore();
	// Get entries with async data
	await useAsyncData(() => entryStore.getAll(), {
		initialCache: false,
	});
	// Modal refence - used to open modal
	const entryModal = ref();
	//Search for record in table
	const search = ref("");
	// headers for the table
	const headers: Header[] = [
		{ text: "Datum", value: "date", width: 150 },
		{ text: "Velika Poraba", value: "highCost", sortable: true, width: 100 },
		{ text: "Velika Razlika", value: "highDifference", sortable: true, width: 100 },
		{ text: "Mala Poraba", value: "lowCost", sortable: true, width: 100 },
		{ text: "Mala Razlika", value: "lowDifference", sortable: true, width: 100 },
		{ text: "Temperatura", value: "temp", sortable: true },
		{ text: "Stevec", value: "counter", sortable: true,  width: 100 },
		{ text: "Razlika stevca", value: "solarGrown", sortable: true,  width: 100 },
		{ text: "Actions", value: "actions", width: 100 },
	];
	// Method used to remove a entry
	const removeEntry = async (entry) => {
		await entryStore.remove(entry._id);
	};
</script>