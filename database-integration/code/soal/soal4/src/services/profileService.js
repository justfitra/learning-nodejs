import { User } from "../models/userModel.js";
import { toLower } from "../utils/sanitaze.js";
import bycrpt from "bcrypt";

export const updateProfile = async (userId, payload) => {
  const usernameSanitaze = toLower(payload.username);

  let hashPassword;
  if (payload.password) {
    hashPassword = await bycrpt.hash(payload.password, 8);
  } else {
    hashPassword = payload.password;
  }

  const userUpdate = await User.findOneAndUpdate(
    { _id: userId },
    { ...payload, username: usernameSanitaze, password: hashPassword },
    {
      new: true,
      runValidators: true,
    }
  );

  return userUpdate;
};
