import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
import { AppError } from "../utils/appError.js";

export const authenticationValidate = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders.startWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }
  const token = authHeaders.split(" ")[1];
  const payload = jwt.verify(token, envConfig.jwt_accces_secret);

  req.user = payload;
  next();
};
