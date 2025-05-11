import UserModel from "../model/user.model.js";

class UserService {
  #userModel;

  constructor() {
    this.#userModel = UserModel;
  }

  async create(userData) {
    const { firebaseUid } = userData;

    const existingUser = await this.#userModel.findOne({ firebaseUid });

    if (existingUser) {
      throw new Error("User with this Firebase UID already exists");
    }

    const user = new this.#userModel(userData);

    return await user.save();
  }

  async getUserByUid(firebaseUid) {
    if (!firebaseUid) throw new Error("UID is required");

    const user = await this.#userModel.findOne({ firebaseUid });

    if (!user) throw new Error("User not found");

    return {
      uid: user.firebaseUid,
      displayName: user.displayName,
      email: user.email,
    };
  }
}
export default UserService;
