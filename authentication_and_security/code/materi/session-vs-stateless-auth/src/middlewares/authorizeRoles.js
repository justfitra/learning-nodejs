import { AppError } from "../utils/appError";

export const authorization =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
