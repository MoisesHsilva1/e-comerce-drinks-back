import DrinkModel from "../model/drink.model.js";
import cloudinary from "../config/cloudinary/cloudinary.js";

class DrinkService {
  #drinkModel;
  #cloudinary;

  constructor({ drinkModel, cloudinary } = {}) {
    this.#drinkModel = drinkModel;
    this.#cloudinary = cloudinary;
  }

  async create(drinkData) {
    const { name, description, price, qtd, image } = drinkData;

    const uploaded = await this.#cloudinary.uploader.upload(image, {
      folder: "image-products",
      resource_type: "image",
    });

    const drink = new this.#drinkModel({
      name,
      description,
      price,
      qtd,
      image: uploaded.secure_url,
    });

    return await drink.save();
  }

  async get() {
    return await this.#drinkModel.find();
  }

  async getByName(name) {
    return await this.#drinkModel.find({ name });
  }

  async getByID(id) {
    return await this.#drinkModel.findById(id);
  }
}

export default DrinkService;
