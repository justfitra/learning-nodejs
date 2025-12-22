import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, envConfig.access_token, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, envConfig.refresh_token, { expiresIn: "7d" });
};
