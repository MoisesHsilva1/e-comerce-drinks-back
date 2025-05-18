import DrinkPurchaseModel from "../model/drinkPurchase.model.js";

class DrinkPurchaseService {
  #DrinkPurchaseModel;

  constructor() {
    this.#DrinkPurchaseModel = DrinkPurchaseModel;
  }

  async create(drinkPurchaseData) {
    const savedDrink = new this.#DrinkPurchaseModel(drinkPurchaseData);

    return await savedDrink.save();
  }

  async get() {
    return await this.#DrinkPurchaseModel.find()
  }
}
export default DrinkPurchaseService;
