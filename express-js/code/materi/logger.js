export const logger = (req, res, next) => {
  console.log(`[${new Date().tocISOString()}] ${req.method} ${req.path}`);
  next();
};
