import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamp: true,
  }
);

export const Comment = mongoose.model("comment", commentSchema);
