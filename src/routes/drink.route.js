import express from "express";
import DrinkController from "../controller/drink.controller.js";

const router = express.Router();

const drinkController = new DrinkController();

router.post("/create", drinkController.createDrink.bind(drinkController));

export default router;
