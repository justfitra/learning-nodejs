import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import { envConfig } from "../config/envConfig.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoced = jwt.verify(token, envConfig.jwt_access_secret);
    req.user = decoced;
    next();
  } catch (err) {
    next(err);
  }
};
