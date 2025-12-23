import { envConfig } from "../config/envConfig.js";
import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, envConfig.access_token);

  req.user = payload;
  next();
};
