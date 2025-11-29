import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";

export const create = async (fromUser, toUser, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sender = await User.findOne({ username: fromUser }).session(session);
    const reciver = await User.findOne({ username: toUser }).session(session);

    if (!sender || !reciver) {
      throw new AppError("Error User not found", 404);
    }

    if (sender.balance < amount) {
      throw new AppError("Insufficient funds", 400);
    }

    sender.balance -= amount;
    reciver.balance += amount;
    await sender.save({ session });
    await reciver.save({ session });
    await session.commitTransaction();

    return {
      from: fromUser,
      to: toUser,
      amount: amount,
      status: "Success",
    };
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message);

    throw err;
  } finally {
    session.endSession();
  }
};
