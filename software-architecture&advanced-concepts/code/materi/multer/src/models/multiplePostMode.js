import mongoose from "mongoose";

const multiplePostModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});
