import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  app_name: process.env.APP_NAME,
};
