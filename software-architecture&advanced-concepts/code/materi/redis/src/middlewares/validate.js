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

export const imageValidate = (schema) => (req, res, next) => {
  const imageError = schema(req.file);
  if (imageError.error) {
    return res.status(422).json({
      success: false,
      errors: [imageError.error],
    });
  }

  next();
};
