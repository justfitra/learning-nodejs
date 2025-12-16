import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, index: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ category: 1, price: -1 });

export const Product = mongoose.model("Product", productSchema);
