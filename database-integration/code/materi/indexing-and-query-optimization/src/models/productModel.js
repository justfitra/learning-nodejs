import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, index: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true, unique: true },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 1, category: 1 });

export const Product = mongoose.model("Poduct", productSchema);
