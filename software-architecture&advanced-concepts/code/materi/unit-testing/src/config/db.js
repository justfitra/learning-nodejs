import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(`${envConfig.db_host}/${envConfig.db_name}`);

    console.log("Database Connected");
  } catch (err) {
    console.error(err.message);
  }
};
