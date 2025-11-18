import dotenv from "dotenv";
dotenv.config();

export const dotenvConfig = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  mongo_host: process.env.MONGO_HOST,
  mongo_name: process.env.MONGO_NAME,
};
