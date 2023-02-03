import EntriesModel from "@/server/models/entries"

export default defineEventHandler(async (event) => {
  
  return await EntriesModel.find().sort({ published: -1 })
})