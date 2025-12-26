import { AppError } from "../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.body = value;
  next();
};
