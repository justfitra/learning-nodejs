import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect(`${envConfig.database_url}`);
    console.log("database connected");
  } catch (err) {
    console.error(err.message);
    process.env.exit(1);
  }
};
