import { createClient } from "redis";
import { envConfig } from "./envConfig.js";

export const redisClient = createClient({
  url: envConfig.redis_url,
});

redisClient.on("error", () => {
  console.error("Redis Error : ", err);
});

await redisClient.connect();
