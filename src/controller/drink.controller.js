import DrinkService from "../services/drink.service.js";

class DrinkController {
  #drinkService;

  constructor() {
    this.#drinkService = new DrinkService();
  }

  async createDrink(req, res) {
    try {
      const { name, description, price } = req.body;
      const qtd = JSON.parse(req.body.qtd)
      const image = req.file?.path;

      const newDrink = await this.#drinkService.create({
        name,
        description,
        price,
        qtd,
        image,
      });

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

  async findByNameDrink(req, res) {
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

  async findByIdDrink(req, res) {
    try {
      const { id } = req.params;

      const drinkById = await this.#drinkService.getByID(id);

      res.status(200).json(drinkById);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: err.message || " Error in find drinks by ID" });
    }
  }
}

export default DrinkController;
