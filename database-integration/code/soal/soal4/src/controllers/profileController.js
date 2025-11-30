import { updateProfile } from "../services/profileService.js";

export const update = async (req, res, next) => {
  try {
    const user = await updateProfile(req.params.userId, req.body);

    res.status(201).json({ message: "User Updated Successfully", data: user });
  } catch (err) {
    next(err);
  }
};
