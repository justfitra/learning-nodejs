import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongo_uri);
    console.log(`Database connected: ${envConfig.db_name} `);
  } catch (err) {
    console.error(err.message);
  }
};
