import { formatResponse } from "../utils/formatResponse.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.log(`Error ${status} - ${message} `);

  return res.status(status).json(formatResponse(status, message));
};
