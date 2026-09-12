import bcrypt from "bcryptjs";

const saltRounds = 10;
export const hashPassword = async (password) =>
  await bcrypt.hash(password, saltRounds);

export const comparePassword = async (pain, hash) =>
  await bcrypt.compare(pain, hash);
