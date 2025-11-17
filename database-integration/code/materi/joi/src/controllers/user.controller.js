import validator from "validator";
export const create = async (req, res, next) => {
  try {
    const emailValidate = validator.normalizeEmail(req.body.email);
  } catch (err) {
    next(err);
  }
};
