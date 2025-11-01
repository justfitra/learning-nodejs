export const logger = (req, res, next) => {
  const date = new Date();
  console.log(`[${req.method}] ${req.url} - ${date.toLocaleString()}`);
  next();
};

export const timeChecker = (req, res, next) => {
  const hour = new Date().getHours();
  if (hour < 5 && hour >= 1) {
    return res
      .status(503)
      .json({ message: "Server istirahat, coba lagi pagi" });
  }
  next();
};

export const randomFail = (req, res, next) => {
  const number = Math.random();

  if (number < 0.3) {
    return next(new Error("Koneksi gagal mendadak"));
  }

  next();
};

export const errorHandling = (err, req, res, next) => {
  res
    .status(500)
    .json({ message: "Terjadi Error Server", detail: err.message });
};
