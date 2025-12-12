import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, min: 3, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
