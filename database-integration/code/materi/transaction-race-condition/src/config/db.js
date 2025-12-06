import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb://${envConfig.db_host}/${envConfig.db_name}`
    );
    console.log("Connecction Successfully");
  } catch (err) {
    console.log(err.message);
    process.env.exit(1);
  }
};
