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
      res.status(400).json({ error: err.message || "Error in create drink" });
    }
  }

  async listDink(req, res) {
    try {
      const drinks = await this.#drinkService.get();

      res.status(200).json(drinks);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || "Error in list drinks" });
    }
  }

  async listByNameDrink(req, res) {
    try {
      const { name } = req.params;

      const drinksName = await this.#drinkService.getByName(name);

      res.status(200).json(drinksName);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: err.message || "Error in list drinks by name " });
    }
  }
}

export default DrinkController;
