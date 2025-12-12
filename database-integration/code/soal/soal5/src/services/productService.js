import mongoose from "mongoose";
import { Product } from "../models/productModel.js";
import { AppError } from "../utils/AppError.js";

export const create = async (payload) => {
  if (payload.stock < 1) {
    throw new AppError("Stock must more than 0", 400);
  }
  const product = await Product.create(payload);

  return product;
};

export const update = async (title, payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    console.log(title, payload.stock);

    const product = await Product.updateOne(
      { title: title },
      {
        $inc: { stock: payload.stock },
        title: payload.title,
        price: payload.price,
      },
      { new: true, runValidators: true }
    );
    await session.commitTransaction();
    return product;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};
