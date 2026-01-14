import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().min(3),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  role: Joi.string().required(),
});
