import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().min(3).required(),
  role: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
