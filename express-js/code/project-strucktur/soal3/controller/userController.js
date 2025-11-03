import { addUser, fetchUser } from "../services/userServices.js";
import { formatRespose } from "../utils/formatRespose.js";

export const getAllUsers = (req, res, next) => {
  try {
    const users = fetchUser();

    res.status(200).json(formatRespose(200, "Get User Successfully", users));
  } catch (err) {
    next(err);
  }
};

export const createUser = (req, res, next) => {
  try {
    const user = addUser(req.body.name, req.body.age);

    res.status(201).json(formatRespose(201, "User Successfully Created", user));
  } catch (err) {
    next(err);
  }
};
