import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),

  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const registerUserAvatarScema = (file) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxSize = 2 * 1024 * 1024;

  if (!file) {
    return { error: "Gambar wajib di isi" };
  }

  if (!allowedMimes.includes(file.mimetype)) {
    return { error: "Format gambar harus JPG, PNG, WEBP, atau GIF" };
  }

  if (file.size > maxSize) {
    return { error: "Ukuran gambar maksimal 2MB" };
  }

  return { error: null };
};
