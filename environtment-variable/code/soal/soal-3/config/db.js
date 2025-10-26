import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  node_env: process.env.NODE_ENV,
  log_level: process.env.LOG_LEVEL,
};
