import { User } from "../models/userModels.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const create = async (payload) => {
  console.log(payload);
  const hsPass = await hashPassword(payload.password);
  const user = await User.create({
    name: payload.name,
    password: hsPass,
  });

  return {
    name: user.name,
  };
};

export const validatePassword = async (name, password) => {
  const user = await User.findOne({ name: name });

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return isValid;
};
