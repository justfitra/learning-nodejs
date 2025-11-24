import Joi from "joi";

export const userValidator = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
