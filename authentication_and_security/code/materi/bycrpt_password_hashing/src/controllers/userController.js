import e from "express";
import * as userService from "../services/userService.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    return res.status(201).json({ message: "Success", data: user });
  } catch (err) {
    next(err);
  }
};

export const validate = async (req, res, next) => {
  try {
    const valid = await userService.validatePassword(
      req.body.name,
      req.body.password
    );

    return res.status(200).json({ message: "Success", data: valid });
  } catch (err) {
    next(err);
  }
};
