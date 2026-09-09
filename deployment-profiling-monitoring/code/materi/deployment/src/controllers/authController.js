import * as authService from "../services/authService.js";
import * as refreshTokenRepository from "../repositories/refreshTokenRepository.js";
import { formatResponse } from "../utils/formatResponse.js";
const createLogin = async (req, res, next) => {
  try {
    const response = await authService.login(refreshTokenRepository, req.body);

    return res.status(201).json(formatResponse(201, "Success", response));
  } catch (err) {
    next(err);
  }
};

const createRegister = async (req, res, next) => {
  try {
    const response = await authService.register(
      refreshTokenRepository,
      req.body,
    );

    return res.status(201).json(formatResponse(201, "Success", response));
  } catch (err) {
    next(err);
  }
};

export { createLogin, createRegister };
