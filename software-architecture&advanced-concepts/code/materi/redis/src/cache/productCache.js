import { redisClient } from "../config/redis.js";

const CACHE_KEY = "products:all";

const getProductCache = async () => {
  const cached = await redisClient.get(CACHE_KEY);

  if (!cached) {
    return null;
  }

  return JSON.parse(cached);
};

const setProductCache = async (products) => {
  await redisClient.set(CACHE_KEY, JSON.stringify(products), {
    EX: 60,
  });
};

const deleteProductCache = async () => {
  await redisClient.del(CACHE_KEY);
};

export { getProductCache, setProductCache, deleteProductCache };
