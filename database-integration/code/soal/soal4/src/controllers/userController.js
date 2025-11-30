import validator from "validator";
import * as userService from "../services/userService.js";

export const createUser = async (req, res, next) => {
  try {
    const sanitazeEmail = validator.normalizeEmail(req.body.email);
    const payload = { ...req.body, email: sanitazeEmail };

    const user = await userService.create(payload);

    res.status(201).json({ message: "User Created Successfully", data: user });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // console.log(!req.query);

    const users = await userService.get(req.query);

    res.status(200).json({ message: "User Created Successfully", data: users });
  } catch (err) {
    next(err);
  }
};
