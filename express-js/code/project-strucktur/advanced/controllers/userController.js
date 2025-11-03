import { addUser, fetchUsers } from "../services/userService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const getAllUser = (req, res, next) => {
  try {
    const users = fetchUseres();

    res.status(200).json(formatResponse(200, "User Successfully Get", users));
  } catch (err) {
    next(err);
  }
};

export const createUser = (req, res, next) => {
  try {
    const user = addUser(req.body.name, req.body.age);

    res
      .status(201)
      .json(formatResponse(201, "Data Successfully Created", user));
  } catch (err) {
    next(err);
  }
};
