import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnector = async () => {
  try {
    await mongoose.connect(envConfig.mongo_uri);
    console.log("Connected Successfully");
  } catch (err) {
    console.error(err.message);
  }
};
