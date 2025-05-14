import express from "express";
import DrinkController from "../controller/drink.controller.js";
import { Timestamp } from "firebase-admin/firestore";

class RouterDrink {
  #drinkController;

  constructor() {
    this.router = express.Router();
    this.#drinkController = new DrinkController();
    this._setupRoutes();
  }

  _setupRoutes() {
    this.router.post(
      "/create",
      this.#drinkController.createDrink.bind(this.#drinkController)
    );

    this.router.get(
      "/list",
      this.#drinkController.listDink.bind(this.#drinkController)
    );

    this.router.get(
      "/listByName/:name",
      this.#drinkController.listByNameDrink.bind(this.#drinkController)
    );

    this.router.get(
      "/findById/:id",
      this.#drinkController.findByIdDrink.bind(this.#drinkController)
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new RouterDrink().getRouter();
