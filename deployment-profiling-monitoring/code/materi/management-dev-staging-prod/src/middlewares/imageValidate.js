import { AppError } from "../utils/appError.js";

export const imageValidate = (schema) => (req, res, next) => {
  const imageError = schema(req.file);
  if (imageError.error) {
    return res.status(422).json({
      success: false,
      errors: [imageError.error],
    });
  }

  next();
};
