import { formatResposne } from "../utils/formatResponse.js";

export const imageValidate = (schema) => (req, res, next) => {
  const imageError = schema(req.file);

  if (imageError.error) {
    return res
      .status(400)
      .json(formatResposne(imageError.status, imageError.error));
  }

  next();
};
