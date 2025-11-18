import Joi from "joi";

export const createUserValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  age: Joi.number().min(18).max(60).optional(),
  website: Joi.string().uri().optional(),
  bio: Joi.string().max(200).optional(),
});

export const updateUserValidation = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .optional(),
  age: Joi.number().min(18).max(60).optional(),
  website: Joi.string().uri().optional(),
  bio: Joi.string().max(200).optional(),
});
