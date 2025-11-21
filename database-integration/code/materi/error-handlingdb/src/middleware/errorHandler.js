export const clientErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

export const errorLogger = (err, req, res, next) => {
  console.log(`Error - [${err.status}] ${err.name} ${err.message}`);
};
