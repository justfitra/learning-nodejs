// import { use } from "react";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import qs from "qs";

export const create = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError("email already exits", 400);
  }

  const hashPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({ ...payload, password: hashPassword });
  return {
    email: user.email,
    age: user.age,
    role: user.role,
    age: user.age,
    address: user.address,
    street: user.street,
    city: user.city,
  };
};

export const get = async (query) => {
  // if (!query || query.legth == 0) {
  //   const users = await User.find({})
  //     .where("email username bio balance lphone")
  //     .limit();

  //   return users;
  // }

  const que = qs.parse(query);
  const balanceFilter = Number(que.balance.gte);

  const users = await User.find({ balance: { $gte: balanceFilter } })
    .sort(`${query.createdAt}`)
    .limit(query.limit)
    .select("email username bio balance phone");

  return users;
};
