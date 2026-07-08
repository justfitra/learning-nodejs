import { redisClient } from "../config/redis.js";

const CACHE_KEY = "users:all";

const getUserCache = async () => {
  const cached = await redisClient.get(CACHE_KEY);

  if (!cached) {
    return null;
  }

  return JSON.parse(cached);
};

const setUserCache = async (users) => {
  await redisClient.set(CACHE_KEY, JSON.stringify(users), {
    EX: 60,
  });
};

const deleteUserCache = async () => {
  await redisClient.del(CACHE_KEY);
};

export { getUserCache, setUserCache, deleteUserCache };
