import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  db_name: process.env.DB_NAME,
  db_host: process.env.DB_HOST,
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
};
