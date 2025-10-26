import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  api_key: process.env.API_KEY,
};
