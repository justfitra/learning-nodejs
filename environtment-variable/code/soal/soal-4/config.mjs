import dotenv from "dotenv";

dotenv.config();

export const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  api_key: process.env.API_KEY,
};
