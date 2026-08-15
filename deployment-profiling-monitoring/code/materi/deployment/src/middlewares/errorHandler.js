import logger from "../config/logger.js";
import { formatResponse } from "../utils/formatResponse.js";

export const erorrHandler = (req, res, next, err) => {
  const statusCode = err.status;
  const message = err.message;

  logger.error(err.stack);

  res.status(statusCode).json(formatResponse(statusCode, message));
};
