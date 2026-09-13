import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "./envConfig.js";

cloudinary.config({
  cloud_name: envConfig.cluodinary_cloud_name,
  api_key: envConfig.cluodinary_api_key,
  api_secret: envConfig.cluodinary_api_secret,
});

export default cloudinary;
