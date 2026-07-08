export const validate = (schema) => (req, re, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    next(error);
  }

  req.body = value;

  next();
};
