import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";

export const generateAccessToken = (payload) =>
  jwt.sign(payload, envConfig.secret_key, { expiresIn: "15m" });

export const generateRefershToken = (payload) =>
  jwt.sign(payload, envConfig.secret_key, { expiresIn: "7d" });
