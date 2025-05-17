import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary/cloudinary.js";

class CloudinaryStorageService {
  #storage;

  constructor(folder = "image-products") {
    this.#storage = new CloudinaryStorage({
      cloudinary,
      params: async (req, file) => ({
        folder,
        resource_type: "image",
        format: "png",
        public_id: file.originalname.split(".")[0],
      }),
    });
  }

  getUploader() {
    return multer({ storage: this.#storage });
  }
}

export default CloudinaryStorageService;
