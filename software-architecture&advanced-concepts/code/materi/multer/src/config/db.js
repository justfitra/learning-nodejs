import mongoose from "mongoose";
import envConfig from "./envConfig.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(`${envConfig.db_host}/${envConfig.db_name}`);

    console.log("Connection Successfully");
  } catch (err) {
    console.error("Error connection", err);
  }
};

export default dbConnection;
