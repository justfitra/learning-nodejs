import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect(`${envConfig.db_host}/${envConfig.db_name}`);

    console.log("Connection Successfully");
  } catch (err) {
    console.log("Error connection", err);
  }
};
