import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
export const generateAccessToken = (payload) =>
  jwt.sign(payload, envConfig.jwt_access_secret, { expiresIn: "15m" });
export const genreteRefreshToken = (payload) =>
  jwt.sign(payload, envConfig.jwt_refresh_secret, { expiresIn: "7d" });
