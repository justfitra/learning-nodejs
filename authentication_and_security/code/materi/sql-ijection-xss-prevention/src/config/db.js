import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(`${envConfig.db_url}/${envConfig.db_name}`);

    console.log("Database Connect");
  } catch (err) {
    console.error(err.message);
    process.env.exit(1);
  }
};
