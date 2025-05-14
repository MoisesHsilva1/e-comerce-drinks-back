import DrinkModel from "../model/drink.model.js";

class DrinkService {
  #drinkModel;

  constructor() {
    this.#drinkModel = DrinkModel;
  }

  async create(drinkData) {
    if (!drinkData) {
      throw new Error("All fields required");
    }

    const drink = new this.#drinkModel(drinkData);

    return await drink.save();
  }

  async get() {
    return await this.#drinkModel.find();
  }

  async getByName(name) {
    return await this.#drinkModel.findOne({ name });
  }

  async getByID(id) {
    return await this.#drinkModel.findById(id);
  }
}

export default DrinkService;
