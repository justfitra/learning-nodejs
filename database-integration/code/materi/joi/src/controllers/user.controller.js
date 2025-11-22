import validator from "validator";
import { userSchemaValidation } from "../validations/user.validation.js";
import { User } from "../models/user.model.js";
import { createUserServce } from "../services/user.service.js";

export const create = async (req, res, next) => {
  try {
    const result = await createUserServce(req.body);

    return res.status(201).json({ data: result });
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
