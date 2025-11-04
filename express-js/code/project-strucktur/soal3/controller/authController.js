import { auth } from "../services/authServices.js";
import { formatRespose } from "../utils/formatRespose.js";

export const authController = (req, res, next) => {
  try {
    const user = auth(req.body.username, req.body.password);

    res.status(200).json(formatRespose(200, "Login Success", user));
  } catch (err) {
    next(err);
  }
};
