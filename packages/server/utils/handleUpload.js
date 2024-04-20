import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

import path from "path";

const tempDir = "./temp";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const handleUpload = async (file) => {
  try {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(tempDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);

    return res;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export default handleUpload;
