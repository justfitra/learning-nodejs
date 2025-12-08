import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(225).required(),
  email: Joi.string().email().required(),
  balance: Joi.number().min(10).required(),
});
