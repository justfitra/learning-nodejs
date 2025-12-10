import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(225).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  balance: Joi.number().required(),
});
