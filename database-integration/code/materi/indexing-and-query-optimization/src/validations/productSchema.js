import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().integer().required(),
  category: Joi.string().required(),
  stock: Joi.number().integer().required(),
});
