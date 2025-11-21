import { formatResponse } from "../utils/formatResponse.js";
import * as userService from "../services/userService.js";
import validator from "validator";
import { userValidatior } from "../validations/userValidator.js";

export const createUser = async (req, res, next) => {
  try {
    const sanitazeEmail = validator.normalizeEmail(req.body.email);
    const payload = { ...req.body, email: sanitazeEmail };

    const { error } = userValidatior.validate(payload);

    if (error) {
      next(formatResponse(400, error.message));
    }

    const user = await userService.create(payload);

    res
      .status(201)
      .json(formatResponse(201, "User Created Successfully", user));
  } catch (err) {
    next(formatResponse(500, err));
  }
};
