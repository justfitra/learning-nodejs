import { formatRespose } from "../utils/formatResponse.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.log(`Error [${statusCode}] - ${message}`);

  return res.status(statusCode).json(formatRespose(statusCode, message));
};
