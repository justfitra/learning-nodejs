import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  age: Joi.number().integer().required(),
});
