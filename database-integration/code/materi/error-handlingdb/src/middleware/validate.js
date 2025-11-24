import { formatResponse } from "../utils/formatResponse.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json(formatResponse(400, error.message));
  }

  req.body = value;
  next();
};
