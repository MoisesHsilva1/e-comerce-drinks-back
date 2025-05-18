import DrinkPurchaseService from "../services/drinkPurchase.service.js";

class DrinkPurchaseController {
  #drinkPurchaseService;

  constructor() {
    this.#drinkPurchaseService = new DrinkPurchaseService();
  }

  async saveDrinkPurchase(req, res) {
    try {
      const savedDrink = await this.#drinkPurchaseService.create(req.body);

      res.status(201).json(savedDrink);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || "Error in save Drink" });
    }
  }
  async listDrinksPurchases(req, res) {
    try {
      const drinksPurchases = await this.#drinkPurchaseService.get();
      res.status(200).json(drinksPurchases);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: err.message || "Error in list drinks Purchases" });
    }
  }
}
export default DrinkPurchaseController;
