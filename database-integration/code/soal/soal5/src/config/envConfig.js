import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_host: process.env.APP_HOST,
  db_host: process.env.DB_HOST,
  app_port: process.env.APP_PORT,
  db_name: process.env.DB_NAME,
};
