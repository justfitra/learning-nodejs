import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
};
