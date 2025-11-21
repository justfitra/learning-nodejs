import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${envConfig.dbHost}/${envConfig.dbName}`);
    console.log("Connection Successfully");
  } catch (err) {
    console.log(err.message);

    process.env.exit(1);
  }
};
