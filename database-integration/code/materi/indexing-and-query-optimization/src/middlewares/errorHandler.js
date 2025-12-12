import { formatResponse } from "../utils/formatResponse.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 400;
  const message = err.message || "Internal Server Error";

  console.error(`Error ${statusCode} - ${message}`);

  return res.status(statusCode).json(formatResponse(statusCode, message));
};
