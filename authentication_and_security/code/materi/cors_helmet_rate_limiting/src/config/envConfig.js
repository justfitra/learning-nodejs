import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  db_uri: process.env.DB_URI,
  db_name: process.env.DB_NAME,
};
