import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_NAME}`
    );
    console.log("connection succesfully");
  } catch (err) {
    process.env.exit(1);
  }
};
