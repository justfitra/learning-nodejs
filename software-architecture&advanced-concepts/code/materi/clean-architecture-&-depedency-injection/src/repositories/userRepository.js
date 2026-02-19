import { User } from "../models/userModels.js";

export const get = async (id) => {
  const users = await User.findById(id);

  return users;
};

export const create = async (payload) => {
  const user = await User.create(payload);

  return user;
};
