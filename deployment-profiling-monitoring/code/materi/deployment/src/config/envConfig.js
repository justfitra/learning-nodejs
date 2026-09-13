import dotenv from "dotenv";

const env = process.env.NODE_ENV || "dev";

dotenv.config({ path: `.env.${env}`, quiet: true });

export const envConfig = {
  app_name: process.env.APP_NAME,
  node_env: process.env.NODE_ENV,
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  mongo_uri: process.env.MONGO_URI,
  cluodinary_cloud_name: process.env.CLUODINARY_CLOUD_NAME,
  cluodinary_api_secret: process.env.CLUODINARY_API_SECRET,
  cluodinary_api_key: process.env.CLUODINARY_API_KEY,
  redis_url: process.env.REDIS_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
};
