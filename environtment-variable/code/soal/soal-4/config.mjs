import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["PORT", "DB_HOST", "DB_USER", "DB_PASS"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
});

console.log("All environment variables are set!");

export const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  api_key: process.env.API_KEY,
};
