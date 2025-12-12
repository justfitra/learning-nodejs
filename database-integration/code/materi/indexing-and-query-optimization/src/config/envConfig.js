import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  db_host: process.env.DB_HOST,
  db_name: process.env.Db_NAME,
};
