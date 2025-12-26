import * as authService from "../services/authService.js";
import { formatRespose } from "../utils/formatResponse.js";

export const loginUser = async (req, res, next) => {
  try {
    const response = await authService.login(req.body);

    return res.status(200).json(formatRespose(200, "Login Success", response));
  } catch (err) {
    next(err);
  }
};
