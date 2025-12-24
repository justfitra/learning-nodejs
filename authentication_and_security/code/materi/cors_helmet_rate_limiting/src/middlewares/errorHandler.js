import { formatResponse } from "../utils/formatResponse.js";

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.log(`Error ${errStatus} - ${message}`);

  return res.status(errStatus).json(formatResponse(errStatus, message));
};
