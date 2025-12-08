export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server error";

  console.log(`Error ${status} - ${message}`);

  return res.status(status).json({ status: status, message: message });
};
