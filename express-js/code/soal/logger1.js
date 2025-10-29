export const logger1 = (req, res, next) => {
  const role = req.query.role;

  if (role === "admin") {
    next();
  } else {
    res.status(403).send("Kamu tidak punya akses");
  }
};
