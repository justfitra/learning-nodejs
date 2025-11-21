import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  appHost: process.env.APP_HOST,
  appPort: process.env.APP_PORT,
};
