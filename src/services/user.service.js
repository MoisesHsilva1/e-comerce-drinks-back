import UserModel from "../model/user.model.js";

class UserService {
  #userModel;

  constructor() {
    this.#userModel = UserModel;
  }

  async create(userData) {
    if (!userData.displayName || !userData.email) {
      throw new Error("All fields required");
    }

    const user = new this.#userModel(userData);

    return await user.save();
  }
}
export default UserService;
