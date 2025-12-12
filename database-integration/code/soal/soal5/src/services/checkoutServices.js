import mongoose from "mongoose";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/AppError.js";

export const checkoutServices = async (nameUser, nameProduct) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findOne({ title: nameProduct });
    const user = await User.findOne({ name: nameUser });

    if (!product || !user) {
      throw new AppError("User or Product must be required", 400);
    }

    if (product.stock < 1) {
      throw new AppError("Product sold out", 500);
    }
    product.stock -= 1;
    user.balance -= product.price;

    await product.save({ session });
    await user.save({ session });
    await session.commitTransaction();

    return {
      user: nameUser,
      buy: nameProduct,
      price: product.price,
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
