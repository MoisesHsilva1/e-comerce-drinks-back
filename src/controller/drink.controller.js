import DrinkService from "../services/drink.service.js";

class DrinkController {
  #drinkService;

  constructor() {
    this.#drinkService = new DrinkService();
  }

  async createDrink(req, res) {
    try {
      const drinkData = req.body;
      const newDrink = await this.#drinkService.create(drinkData);
      res.status(201).json(newDrink);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || "err in create drink" });
    }
  }
}

export default DrinkController;
