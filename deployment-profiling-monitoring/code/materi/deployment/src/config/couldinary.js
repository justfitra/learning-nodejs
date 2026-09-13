import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "./envConfig.js";

cloudinary.config({
  cloud_name: envConfig.cloudinary_cloud_name,
  api_key: envConfig.cloudinary_api_key,
  api_secret: envConfig.cloudinary_api_secret,
});

export default cloudinary;
