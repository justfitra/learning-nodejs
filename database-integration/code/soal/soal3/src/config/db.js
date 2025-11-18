import mongoose from "mongoose";
import { dotenvConfig } from "./dotenv.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${dotenvConfig.mongo_host}/${dotenvConfig.mongo_name}`
    );
    console.log("Connection Successfully");
  } catch (err) {
    console.error(err.message);

    process.env.exit(1);
  }
};
