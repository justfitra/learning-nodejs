export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) {
    next(error);
  }

  req.body = value;
  next();
};
