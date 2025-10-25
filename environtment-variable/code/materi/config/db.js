import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  port: process.env.PORT,
  host: process.env.HOST,
  name: process.env.APP_NAME,
  author: process.env.AUTHOR,
};

// First install dotenv with npm install
