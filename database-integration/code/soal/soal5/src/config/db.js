import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb://${envConfig.db_host}/${envConfig.db_name}`
    );
    console.log("Connection Successfully");
  } catch (err) {
    process.env.exit(1);

    console.error(err.message);
  }
};
