import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const dbConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  message: process.env.MESSAGE,
};

console.log(process.env.NODE_ENV);
