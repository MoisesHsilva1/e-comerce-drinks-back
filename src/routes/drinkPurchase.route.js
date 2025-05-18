import express from "express";
import DrinkPurchaseController from "../controller/drinkPurchase.controller.js";

class RouterDrinkPurchase {
  #drinkPurchaseController;

  constructor() {
    this.router = express.Router();
    this.#drinkPurchaseController = new DrinkPurchaseController();
    this._setupRoutes();
  }

  _setupRoutes() {
    this.router.post(
      "/save",
      this.#drinkPurchaseController.saveDrinkPurchase.bind(
        this.#drinkPurchaseController
      )
    );

    this.router.get(
      "/list",
      this.#drinkPurchaseController.listDrinksPurchases.bind(
        this.#drinkPurchaseController
      )
    );
  }

  getRouter() {
    return this.router;
  }
}
export default new RouterDrinkPurchase().getRouter();
