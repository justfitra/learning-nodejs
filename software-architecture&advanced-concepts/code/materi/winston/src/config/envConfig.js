import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  node_env: process.env.NODE_ENV,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  redis_url: process.env.REDIS_URL,
};
