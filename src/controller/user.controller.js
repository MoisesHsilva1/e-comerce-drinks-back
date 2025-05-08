import UserService from "../services/user.service.js";

class UserController {
  #userService;

  constructor() {
    this.#userService = new UserService();
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await this.#userService.create(userData);
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || "err in create user" });
    }
  }
}
export default UserController;
