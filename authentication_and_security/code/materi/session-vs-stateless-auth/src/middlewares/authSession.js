import { formatResponse } from "../utils/formatResponse.js";

export const authSession = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json(formatResponse(401, "Unauthorized"));
  }
  next();
};
