import * as authService from "../services/authService.js";
import { formatResponse } from "../utils/formatResponse";

export const createLogin = async (req, res, next) => {
  try {
    const resposne = await authService.login(req.body);

    return res.status(200).json(formatResponse(200, "Login Success", resposne));
  } catch (err) {
    next(err);
  }
};

export const createRegister = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
