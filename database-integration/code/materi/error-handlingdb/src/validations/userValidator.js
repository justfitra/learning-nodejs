import Joi from "joi";

export const userValidatior = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
