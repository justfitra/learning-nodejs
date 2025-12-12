import Joi from "joi";

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).required(),
  price: Joi.number().min(1).required(),
  stock: Joi.number().min(1).required(),
});
