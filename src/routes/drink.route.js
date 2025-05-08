import express from "express";
import DrinkController from "../controller/drink.controller.js";

class RouterDrink {
    #drinkController;

    constructor() {
        this.router = express.Router();
        this.#drinkController = new DrinkController();
        this._setupRoutes();
    }

    _setupRoutes() {
        this.router.post("/create", this.#drinkController.createDrink.bind(this.#drinkController));
    }

    getRouter() {
        return this.router;
    }
}

export default new RouterDrink().getRouter();
