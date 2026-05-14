import Joi from "joi";

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const createProductImageSchema = (file) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxSize = 2 * 1024 * 1024;

  if (!file) {
    return { error: "Gambar wajib diupload" };
  }
  if (!allowedMimes.includes(file.mimetype)) {
    return { error: "Format gambar harus JPG, PNG, WEBP, atau GIF" };
  }
  if (file.size > maxSize) {
    return { error: "Ukuran gambar maksimal 2MB" };
  }

  return { error: null };
};
