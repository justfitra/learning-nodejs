import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
  age: Joi.number(),
  address: Joi.string(),
  street: Joi.string(),
  city: Joi.string(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  role: Joi.string(),
  age: Joi.number(),
  address: Joi.string(),
  street: Joi.string(),
  city: Joi.string(),
});
