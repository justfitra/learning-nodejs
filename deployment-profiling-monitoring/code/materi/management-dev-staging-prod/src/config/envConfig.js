import dotenv from "dotenv";

const env = process.env.NODE_ENV || "dev";

dotenv.config({ path: `.env.${env}` });

export const envConfig = {
  node_env: process.env.NODE_ENV || "production",
  app_host: process.env.APP_HOST || "0.0.0.0",
  app_port: process.env.PORT || process.env.APP_PORT || 3000,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  redis_url: process.env.REDIS_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
};
