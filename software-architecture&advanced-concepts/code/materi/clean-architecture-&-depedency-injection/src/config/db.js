import mongoose from "mongoose";
import envConfig from "./envConfig.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(`${envConfig.db_host}/${envConfig.db_name}`);
    console.log("Connection Success");
  } catch (err) {
    console.error("Erorr Connnection", err);
  }
};

export default dbConnection;
