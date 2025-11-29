import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
  balance: Joi.number().required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  role: Joi.string(),
  balance: Joi.number(),
});
