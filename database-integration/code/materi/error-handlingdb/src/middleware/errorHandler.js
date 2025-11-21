export const clientErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.log(
    `Error - [${err.status}] ${Object.keys(err.message.keyValue)[0]} ${
      err.message
    }`
  );

  if (err.message.name === "MongoServerError" && err.message.code === 11000) {
    return res.status(statusCode).json({
      status: statusCode,
      message: `${Object.keys(err.message.keyValue)[0]} already exists.`,
    });
  }

  return res.status(statusCode).json({
    status: statusCode,
    message,
  });
};
