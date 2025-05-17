import express from "express";
import DrinkController from "../controller/drink.controller.js";
import CloudinaryStorageService from "../utils/storage.js";

class RouterDrink {
  #drinkController;
  #uploader;

  constructor() {
    this.router = express.Router();
    this.#drinkController = new DrinkController();
    this.#uploader = new CloudinaryStorageService().getUploader();
    this._setupRoutes();
  }

  _setupRoutes() {
    this.router.post(
      "/create",
      this.#uploader.single("image"),
      this.#drinkController.createDrink.bind(this.#drinkController)
    );

    this.router.get(
      "/list",
      this.#drinkController.listDink.bind(this.#drinkController)
    );

    this.router.get(
      "/findByName/:name",
      this.#drinkController.findByNameDrink.bind(this.#drinkController)
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
