import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(`${envConfig.db_uri}/${envConfig.db_name}`);

    console.log("database connected");
  } catch (err) {
    console.error(err.message);

    process.env.exit(1);
  }
};
