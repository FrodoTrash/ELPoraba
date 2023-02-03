<template>
  <div>
    <div class="relative mt-5 border border-gray-100 rounded-lg">
			<ClientOnly>
				<EasyDataTable
					empty-message="No entry Found"
					theme-color="#f97316"
					table-class-name="eztble"
					:headers="headers"
					:items="entryStore.monthlies"
					sort-by="date"
					sort-type="desc"
				>
					<!-- formating date -->
					<template #item-date="{ _id }">
						<span>{{ dayjs(`${_id.year}-${_id.month}`).format("MMM, YYYY") }}</span>
					</template>
          
				</EasyDataTable>
			</ClientOnly>
		</div>
  </div>
</template>

<script setup lang="ts">
	import { Header } from "vue3-easy-data-table";
	import dayjs from "dayjs";
  
	// entry store from pinia
	const entryStore = useEntryStore();
	// Get monthly with async data
	await useAsyncData(() => entryStore.getMonthly(), {
		initialCache: false,
	});

	// headers for the table
	const headers: Header[] = [
		{ text: "Mesec", value: "date", width: 50, sortable: true },
		{ text: "Velika Poraba sestevek", value: "totalHighCost", sortable: true, width: 100 },
		{ text: "Mala Poraba sestvek", value: "totalLowCost", sortable: true, width: 100 },
		{ text: "Pridelana Elektricna Energija", value: "totalSolarGrown", sortable: true,  width: 100 },

	];
</script>