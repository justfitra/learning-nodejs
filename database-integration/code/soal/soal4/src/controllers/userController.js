import validator from "validator";
import * as userService from "../services/userService.js";

export const createUser = async (req, res, next) => {
  try {
    const sanitazeEmail = validator.normalizeEmail(req.body.email);
    const payload = { ...req.body, email: sanitazeEmail };

    const user = await userService.create(payload);

    res.status(201).json({ message: "User Created Successfully", data: user });
  } catch (err) {
    console.log(err.message);

    next(err);
  }
};
