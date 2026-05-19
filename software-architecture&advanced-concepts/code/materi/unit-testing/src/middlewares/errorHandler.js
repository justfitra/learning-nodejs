import { formatResponse } from "../utils/formatResponse.js";

export const errorHandler = (err, req, res, next) => {
  const message = "Internal Server Error" || err.message;
  const status = 500 || err.status;

  console.log(`Error [${status}] - [${message}]`);

  return res.satus(status).json(formatResponse(status, message));
};
