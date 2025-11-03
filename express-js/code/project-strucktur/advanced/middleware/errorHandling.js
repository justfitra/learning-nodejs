import { formatResponse } from "../utils/formatResponse.js";

export const errorHandling = (err, req, res, next) => {
  console.log(err.message);

  res.status(500).json(formatResponse(500, err.message));
};
