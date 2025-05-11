import UserService from "../services/user.service.js";
import FireBaseAuthService from "../services/firebase-auth.service.js";
import admin from "firebase-admin";

class UserController {
  #userService;
  #authService;
  #adminFirebase;

  constructor() {
    this.#authService = new FireBaseAuthService();
    this.#userService = new UserService();
    this.#adminFirebase = admin;
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
      const decodedToken = await this.#authService.verifyIdToken(idToken);

      const uid = decodedToken.uid;
      const userRecord = await this.#authService.getUser(uid);
      const customToken = await this.#authService.createCustomToken(uid);

      res.status(200).json({
        message: "Login successful!",
        token: customToken,
        user: userRecord,
      });
    } catch (err) {
      console.error("Error verifying token:", err);
      res.status(400).json({ error: err.message || "Login failed" });
    }
  }

  async getLoggedUser(req, res) {
    try {
      const idToken = req.headers.authorization?.split(" ")[1];
      const decoded = await this.#authService.verifyIdToken(idToken);

      const userData = await this.#userService.getUserByUid(decoded.uid);

      return res.status(200).json({ logged: true, user: userData });
    } catch (err) {
      console.error("Error getting logged user:", err);
      return res.status(401).json({ logged: false, error: err.message });
    }
  }
}

export default UserController;
