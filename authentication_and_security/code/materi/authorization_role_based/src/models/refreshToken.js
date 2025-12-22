import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: Object },
});
