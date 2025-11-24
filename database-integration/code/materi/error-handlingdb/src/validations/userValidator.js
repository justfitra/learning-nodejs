import Joi from "joi";

export const createUserValidator = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const updateUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).optional(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().min(8).optional(),
});
