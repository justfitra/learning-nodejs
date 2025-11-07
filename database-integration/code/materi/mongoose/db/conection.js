import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/employees");
    console.log("Mongo db connect");
  } catch (err) {
    console.error(err.message);

    // throw err;

    process.exit(1);
  }
};
