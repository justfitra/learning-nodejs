import { createClient } from "redis";
import { envConfig } from "./envConfig.js";

export const redisClient = createClient({
  url: envConfig.redis_url,
  password: "root",
});

redisClient.on("error", (err) => {
  console.error("Redis Error : ", err);
});

await redisClient.connect();
