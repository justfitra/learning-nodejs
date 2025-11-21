import { User } from "../models/userModel.js";

export const create = async (payload) => {
  return User.create(payload);
};
