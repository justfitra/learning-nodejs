export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    convert: true,
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) {
    next(error);
  }

  req.body = value;
  next();
};
