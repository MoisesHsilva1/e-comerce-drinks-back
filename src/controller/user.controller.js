import UserService from "../services/user.service.js";
import admin from "firebase-admin";

class UserController {
  #userService;
  #adminFirebase;

  constructor() {
    this.#adminFirebase = admin;
    this.#userService = new UserService();
  }

  async createUser(req, res) {
    try {
      const { email, password, displayName } = req.body;

      const firebaseUser = await this.#adminFirebase.auth().createUser({
        email,
        password,
        displayName,
      });

      const userSaved = await this.#userService.create({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });

      res.status(201).json(userSaved);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || "Error creating user" });
    }
  }

  async loginUser(req, res) {
    try {
      const idToken = req.headers.authorization?.split(" ")[1];

      const decodedToken = await this.#adminFirebase
        .auth()
        .verifyIdToken(idToken);

      const uid = decodedToken.uid;

      const userRecord = await this.#adminFirebase.auth().getUser(uid);

      const customToken = await this.#adminFirebase
        .auth()
        .createCustomToken(uid);

      res.status(200).json({
        message: "Login realizado com sucesso!",
        token: customToken,
        user: userRecord,
      });
    } catch (err) {
      console.error("Erro ao verificar o token:", err);
      res
        .status(400)
        .json({ error: err.message || "Falha ao realizar o login" });
    }
  }
}

export default UserController;
