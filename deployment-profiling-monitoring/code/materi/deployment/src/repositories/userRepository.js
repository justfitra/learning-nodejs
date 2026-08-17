import { User } from "../models/userModel.js";

const get = async () => {
  const user = await User.find();

  return user;
};
const create = async (payload) => {
  const user = await User.create(payload);

  return user;
};

const show = async (params) => {
  const user = await User.findOne({ name: params });

  return user;
};

const update = async (params, payload) => {
  const user = await User.findOneAndUpdate({ name: params }, payload, {
    new: true,
    runValidators: true,
  });
};

const del = async (params) => {
  const user = await User.findOneAndDelete({ name: params });

  return user;
};

export { get, create, show, update, del };
