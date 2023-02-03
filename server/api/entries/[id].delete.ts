import EntriesModel from "~~/server/models/entries";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove entry
	try {
		await EntriesModel.findByIdAndDelete(id);
		return { message: "Entry removed" };
	} catch (e: any) {
		throw createError({
			message: e.message,
		});
	}
});