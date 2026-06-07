import Joi from "joi";

export const createProductSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
});

export const createProductImageSchema = (file) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxSize = 2 * 1024 * 1024;

  if (!file) {
    return { error: "Gambar wajib di upload" };
  }

  if (!allowedMimes.includes(file.mimetype)) {
    return { error: "Format gambar harus JPG, PNG, WEBP, atau GIF" };
  }

  if (file.size > maxSize) {
    return { error: "Ukuran gambar maksimal 2MB" };
  }

  return { error: null };
};

export const updateProductSchema = Joi.object({
  title: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
});

export const updateProductImageSchema = (file) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxSize = 2 * 1024 * 1024;
  if (!file) {
    return { error: null };
  }
  if (!allowedMimes.includes(file.mimetype)) {
    return { error: "Format gambar harus JPG, PNG, WEBP, atau GIF" };
  }

  if (file.size > maxSize) {
    return { error: "Ukuran gambar maksimal 2MB" };
  }

  return { error: null };
};
