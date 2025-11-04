export const logger = (req, res, next) => {
  console.log(
    `URL [${req.url}] - METOHD [${
      req.method
    }] => ${new Date().toLocaleString()}`
  );
  next();
};
