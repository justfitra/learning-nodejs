import Joi from "joi";

export const userSchemaValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().trim().lowercase().required(),
  age: Joi.number().integer().min(18).max(60).optional(),
  password: Joi.string().min(8).required(),
});
