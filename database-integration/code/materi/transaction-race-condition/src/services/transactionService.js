import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";

export const transactionService = async (fromUser, toUser, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // console.log(fromUser);

    const sender = await User.findOne({ name: fromUser }).session(session);
    const receiver = await User.findOne({ name: toUser }).session(session);
    if (!sender || !receiver) {
      throw new AppError("User not found", 404);
    }
    if (sender.balance < amount) {
      throw new AppError("Insufficient funds", 400);
    }
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });
    await session.commitTransaction();
    // console.log("Transaction committed");
    return {
      from: fromUser,
      to: toUser,
      amount: amount,
      status: "Success",
    };
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message);
  } finally {
    session.endSession();
  }
};
