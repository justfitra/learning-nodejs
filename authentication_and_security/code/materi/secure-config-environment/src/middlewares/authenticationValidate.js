import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { AppError } from "../utils/appError";
export const authenticationValidate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token.startWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }
  const verify = jwt.verify(token, envConfig.jwt_accces_secret);

  return;
};
