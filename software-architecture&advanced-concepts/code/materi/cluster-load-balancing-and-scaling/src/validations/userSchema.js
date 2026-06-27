import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
});

export const createUserAvatarSchema = (file) => {
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

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().min(8),
  password: Joi.string().min(8),
});

export const updateUserAvatarSchema = (file) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxSize = 2 * 1024 * 1024;

  if (!allowedMimes.includes(file.mimetype)) {
    return { error: "Format gambar harus JPG, PNG, WEBP, atau GIF" };
  }

  if (file.size > maxSize) {
    return { error: "Ukuran gambar maksimal 2MB" };
  }

  return { error: null };
};
