import Joi from "joi";
const commentValidator = Joi.object({
  username: Joi.string().required().min(3).max(15),
  comment: Joi.string().required(),
});

export { commentValidator };
