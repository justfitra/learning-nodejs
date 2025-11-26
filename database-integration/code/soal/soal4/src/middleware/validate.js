import { AppError } from "../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  const { err, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (err) {
    res.status(400).json({ error: err.message });
  }

  req.body = value;
  next();
};
