import { formatResponse } from "../utils/formatResponse.js";

export const imageValidate = (schema) => (req, res, next) => {
  const imageError = schema(req.file);
  if (imageError.error) {
    return res
      .status(400)
      .json(formatResponse(imageError.status, imageError.error));
  }

  next();
};
