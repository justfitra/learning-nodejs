import { hashPassword } from "../utils/hashPassword.js";

export const get = async (repository, id) => {
  const users = await repository.get(id);

  return users;
};

export const create = async (repository, payload) => {
  const password = await hashPassword(payload.password);

  const user = await repository.create({ ...payload, password: password });

  return {
    id: user._id,
    name: user.name,
  };
};
