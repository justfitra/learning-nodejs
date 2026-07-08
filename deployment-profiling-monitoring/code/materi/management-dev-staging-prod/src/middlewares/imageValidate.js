export const imageValidate = (schema) => (req, res, next) => {
  const imgErr = schema(req, file);

  if (imgErr.error) {
    next(imgErr.error);
  }

  next();
};
