import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "./envConfig.js";

cloudinary.config({
  cloud_name: envConfig.couldinary_could_name,
  api_key: envConfig.couldinary_api_key,
  api_secret: envConfig.couldinary_api_secret,
});

export default cloudinary;
