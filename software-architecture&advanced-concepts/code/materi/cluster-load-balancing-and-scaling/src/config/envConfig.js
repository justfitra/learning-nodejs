import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_port: process.env.APP_PORT,
  app_host: process.env.APP_HOST,
  node_env: process.env.NODE_ENV,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  redis_url: process.env.REDIS_URL,
};
