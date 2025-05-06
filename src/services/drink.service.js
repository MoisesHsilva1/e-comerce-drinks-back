import DrinkModel from "../model/drink.model.js";

class DrinkService {
  #drinkModel;

  constructor() {
    this.#drinkModel = DrinkModel;
  }

  async create(drinkData) {
    if (
      !drinkData.name ||
      !drinkData.price ||
      !drinkData.description ||
      !drinkData.qtd
    ) {
      throw new Error("All fields required");
    }

    const drink = new this.#drinkModel(drinkData);

    return await drink.save();
  }
}

export default DrinkService;
