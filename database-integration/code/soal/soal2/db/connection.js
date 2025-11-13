import mongoose from "mongoose";

export const dbConnet = async () => {
  try {
    const con = mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
    );

    console.log(`connection success`);
  } catch (err) {
    process.env.exit(1);
  }
};
