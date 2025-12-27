import { AppError } from "../utils/appError.js";

export const authorizeRoles = (role) => (req, res, next) => {
  if (!role.includes(req.user.role)) {
    throw new AppError("Forbidden", 403);
  }

  next();
};
