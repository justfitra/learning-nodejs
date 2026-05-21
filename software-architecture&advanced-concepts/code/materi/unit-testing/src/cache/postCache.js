import { redisClient } from "../config/redis.js";
const CACHE_KEY = "posts:all";
const getPostCache = async () => {
  const cached = await redisClient.get(CACHE_KEY);
  if (!cached) {
    return null;
  }

  return JSON.parse(cached);
};

const setPostCache = async (posts) => {
  await redisClient.set(CACHE_KEY, JSON.stringify(posts), {
    EX: 60,
  });
};

const deletePostCache = async () => {
  await redisClient.del(CACHE_KEY);
};

export { getPostCache, setPostCache, deletePostCache };
