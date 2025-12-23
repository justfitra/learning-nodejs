import { AppError } from "../utils/appError.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};
