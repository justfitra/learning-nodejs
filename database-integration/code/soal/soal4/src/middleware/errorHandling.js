export const errorHandling = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message;

  console.log(`Erorr - [${statusCode}] ${message}`);

  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};
