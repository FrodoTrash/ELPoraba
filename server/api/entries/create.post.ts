import EntriesModel from "@/server/models/entries";
import { EntrySchema } from "../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // validate
  let { error } = EntrySchema.validate(body);
  if (error)
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false
    });
  try {
    let lastEntry = await EntriesModel.findOne({
			published: { $lt: body.published }
		}).sort({ published: -1 })
    
    if(lastEntry){
      if (lastEntry.lowCost != 0)
        body.lowDifference =  body.lowCost - lastEntry.lowCost
      if (lastEntry.highCost != 0)
        body.highDifference = body.highCost - lastEntry.highCost
      if (lastEntry.counter != 0)
        body.solarGrown = (body.counter - lastEntry.counter).toFixed(1)
    } else {
      body.lowDifference = 0
      body.highDifference = 0
      body.solarGrown = 0
    }
    
    await EntriesModel.create(body)
    return { message: "entry created" }
  } catch (e: any) {
    throw createError({
      message: e.message,
    });
  }
});