import { envConfig } from "../config/envConfig.js";
import { AppError } from "../utils/appError,js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const headers = req.headers.authorization;

  if (!headers.startsWith("Bearer ")) {
    throw new AppError("Forbidden", 403);
  }

  const token = headers.split(" ")[1];
  const verify = jwt.verify(token, envConfig.jwt_access_secret);

  req.user = verify;
  next();
};
