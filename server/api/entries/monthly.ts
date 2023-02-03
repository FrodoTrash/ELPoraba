import EntriesModel from "@/server/models/entries"

export default defineEventHandler(async (event) => {
  
  return await EntriesModel.aggregate().group({
    _id: {
      year: { $year: "$published" },
      month: { $month: "$published" },
    },
    totalSolarGrown: { $sum: "$solarGrown" },
    totalLowCost: { $sum: "$lowDifference" },
    totalHighCost: { $sum: "$highDifference" }
  })
})