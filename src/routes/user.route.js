import express from "express";
import UserController from "../controller/user.controller.js";

class RouterUser {
  #userController;

  constructor() {
    this.router = express.Router();
    this.#userController = new UserController();
    this._setupRoutes();
  }

  _setupRoutes() {
    this.router.post(
      "/create",
      this.#userController.createUser.bind(this.#userController)
    );

    this.router.post(
      "/login",
      this.#userController.loginUser.bind(this.#userController)
    );

    this.router.get(
      "/logged",
      this.#userController.getLoggedUser.bind(this.#userController)
    );
  }

  getRouter() {
    return this.router;
  }
}
export default new RouterUser().getRouter();
