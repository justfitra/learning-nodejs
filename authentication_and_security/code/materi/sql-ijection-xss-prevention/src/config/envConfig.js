import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  db_url: process.env.DB_URL,
  db_name: process.env.DB_NAME,
  secret_key: process.env.SECRET_KEY,
};
