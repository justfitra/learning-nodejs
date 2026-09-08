import Joi from "joi";

export const createUserSchema = Joi.validate({
  name: Joi.string().required().max(255),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
});

export const createUserAvatarScema = (file) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "iimage/gif"];
  const maxSize = 2 * 1024 * 1024;

  if (!file) {
    return { error: "Gambar wajib di isi" };
  }

  if (!allowedMimes.includes(file.mimetype)) {
    return { error: "Format gambar harus JPG,PNG,WEBP" };
  }

  if (file.size > maxSize) {
    return { error: "Ukuran gambar maksimal 2MB" };
  }

  return { error: null };
};

export const updateUserSchema = Joi.object({
  name: Joi.string().max(255),
  email: Joi.string().email(),
  password: Joi.string(),
  role: Joi.string(),
});
