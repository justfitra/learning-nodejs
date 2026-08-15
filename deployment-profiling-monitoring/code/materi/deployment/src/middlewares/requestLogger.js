import logger from "../config/logger.js";

export const requestLogger = (req, res, next) => {
  logger.http(`${req.method} ${req.originalUrl}`);

  next();
};
