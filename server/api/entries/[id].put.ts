import EntriesModel from "~~/server/models/entries";
import { EntrySchema } from "../validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	// get id from params
	const id = event.context.params.id;

	// validate
	let { error } = EntrySchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}
	// Update Entry
	try {
		//get last post relevant to updating post
		let lastEntry = await EntriesModel.findOne({
			published: { $lt: body.published }
		}).sort({ published: -1 })
		
		if(lastEntry) {
      if (lastEntry.lowCost != 0)
        body.lowDifference =  body.lowCost - lastEntry.lowCost
			else
				body.lowDifference = 0
      if (lastEntry.highCost != 0)
        body.highDifference = body.highCost - lastEntry.highCost
			else
				body.highDifference = 0
      if (lastEntry.counter != 0 && body.counter != 0)
        body.solarGrown = (body.counter - lastEntry.counter).toFixed(1)
			else
				body.solarGrown = 0
    } else {
      body.lowDifference = 0
      body.highDifference = 0
      body.solarGrown = 0
    }
		await EntriesModel.findByIdAndUpdate(id, body);
		return { message: "Entry updated" };
	} catch (e: any) {
		throw createError({
			message: e.message,
		});
	}
});