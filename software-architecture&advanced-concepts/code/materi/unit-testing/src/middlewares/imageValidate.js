import { formatResponse } from "../utils/formatResponse.js";

export const imageValidate = (schema) => (req, res, next) => {
  const imageError = schema(req.file);
  if (imageError.error) {
    return res
      .status(imageError.status)
      .json(formatResponse(imageError.status, imageError.error));
  }

  next();
};
