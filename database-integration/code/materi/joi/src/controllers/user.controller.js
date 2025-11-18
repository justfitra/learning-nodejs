import validator from "validator";
import { userSchemaValidation } from "../validations/user.validation.js";
import { User } from "../models/user.model.js";

export const create = async (req, res, next) => {
  try {
    const sanitazeEmail = validator.normalizeEmail(req.body.email);
    const playload = { ...req.body, email: sanitazeEmail };

    const { error } = userSchemaValidation.validate(playload);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.create(playload);

    return res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const users = await User.find({}).select("name age");

    return res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};
