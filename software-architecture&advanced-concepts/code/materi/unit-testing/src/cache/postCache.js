import { redisClient } from "../config/redis.js";
const CACHE_KEY = "products:all";
const getPostCache = async () => {
  const cached = await redisClient.get(CACHE_KEY);
  if (!cached) {
    return null;
  }

  return JSON.parse(cached);
};

const setPostCache = async (products) => {
  await redisClient.set(CACHE_KEY, JSON.stringify(products), {
    EX: 60,
  });
};

const deletePostCache = async () => {
  await redisClient.del(CACHE_KEY);
};

export { getPostCache, setPostCache, deletePostCache };
