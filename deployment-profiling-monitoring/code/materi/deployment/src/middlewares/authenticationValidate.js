import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import { envConfig } from "../config/envConfig.js";

export const authenticationValidate = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeaders.split(" ")[1];
  const paylaod = jwt.verify(token, envConfig.jwt_access_secret);

  req.user = paylaod;
  next();
};
