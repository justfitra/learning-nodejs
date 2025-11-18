export const erorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[EROR] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};
