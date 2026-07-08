import { User } from "../models/userModel.js";

const get = async () => {
  const users = await User.find();

  return users;
};

const create = async (payload) => {
  const user = await User.create(payload);

  return user;
};

const show = async (name) => {
  const user = await User.find({ name: name });

  return user;
};

const update = async (name, payload) => {
  const user = await User.findOneAndUpdate({ name: name }, payload, {
    new: true,
    runValidators: true,
  });

  return user;
};

const del = async (name) => {
  const user = await User.deleteOne({ name: name });

  return user;
};

export { get, create, show, update, del };
