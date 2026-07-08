import logger from "../config/logger.js";
import { formatResponse } from "../utils/formatResponse.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(err.stack);

  res.status(statusCode).json(formatResponse(statusCode, message));
};
