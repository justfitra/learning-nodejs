import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(225),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  balance: Joi.number().required(),
});
