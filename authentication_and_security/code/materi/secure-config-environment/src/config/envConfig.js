import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  app_name: process.env.APP_NAME,
  database_url: process.env.DATABASE_URL,
  jwt_accces_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  node_env: process.env.NODE_ENV,
};
