import Joi from 'joi'

// emtru validation
export const EntrySchema = Joi.object({
	lowCost: Joi.number().required(),
	highCost: Joi.number().required(),
	temp: Joi.number().required(),
	counter: Joi.number().required(),
	published: Joi.date().required()
});