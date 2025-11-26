import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb://${envConfig.db_host}/${envConfig.db_name}`
    );

    console.log("Connection Successfully");
  } catch (err) {
    console.error(err.message);
  }
};
