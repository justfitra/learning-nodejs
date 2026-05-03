import { formatResponse } from "../utils/formatResponse.js";

export const errorHandler = (err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.status || 500;

  console.log(`error ${statusCode} - ${message}`);

  return res.status(statusCode).json(formatResponse(statusCode, message));
};
