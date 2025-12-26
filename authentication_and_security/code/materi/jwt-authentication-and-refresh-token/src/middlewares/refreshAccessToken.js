import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
import { RefreshToken } from "../models/refreshTokenModel.js";
import { generateAccessToken } from "../utils/token.js";

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  console.log(req.body);

  const storedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!storedToken) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const payload = jwt.verify(refreshToken, envConfig.jwt_refresh_secret);

  const newAccessToken = generateAccessToken({
    userId: payload.userId,
  });

  res.json({ accessToken: newAccessToken });
};
