import { AppError } from "../utils/appError.js";

export const authorization =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.session.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
