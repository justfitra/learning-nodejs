import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  balance: Joi.number().required(),
  phone: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 15 - 1)
    .required()
    .messages({
      "number.min": "number should be 10 digit",
      "number.max": "number max 15 digit",
    }),
  bio: Joi.string().max(200).required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  balance: Joi.number(),
  phone: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 15 - 1)
    .messages({
      "number.min": "number should be 10 digit",
      "number.max": "number max 15 digit",
    }),
  bio: Joi.string().max(200),
});
