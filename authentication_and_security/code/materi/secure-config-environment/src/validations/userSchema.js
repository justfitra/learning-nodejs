import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().min(3).max(255).required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});
