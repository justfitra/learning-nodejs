import dotenv from "dotenv";

const env = process.env.NODE_ENV || "dev";

dotenv.config({ path: `.env.${env}` });

export const envConfig = {
  app_name: process.env.APP_NAME,
  node_env: process.env.NODE_ENV,
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  redis_url: process.env.REDIS_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
};
