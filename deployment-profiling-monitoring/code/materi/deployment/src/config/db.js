import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

const dbConnector = async () => {
  try {
    await mongoose.connect(`${envConfig.db_host}/${envConfig.db_name}`);
    console.log("Connected Successfully");
  } catch (err) {
    console.error(err.message);
  }
};
