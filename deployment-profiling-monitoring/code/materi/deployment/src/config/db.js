import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnector = async () => {
  try {
    await mongoose.connect(envConfig.mongo_uri);
    console.log(`Database connected:  "OK"}`);
  } catch (err) {
    console.error("DB CONNECTION ERROR:", err);
  }
};
