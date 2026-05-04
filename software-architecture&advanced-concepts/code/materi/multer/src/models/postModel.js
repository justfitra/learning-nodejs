import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Post = mongoose.model("Post", postSchema);
