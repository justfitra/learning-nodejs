import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  db_name: process.env.DB_NAME,
  db_host: process.env.DB_HOST,
  app_name: process.env.APP_NAME,
  app_port: process.env.APP_PORT,
};
