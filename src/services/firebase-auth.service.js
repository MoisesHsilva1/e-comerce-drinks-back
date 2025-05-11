import admin from "firebase-admin";

class FireBaseAuthService {
  #admin;

  constructor() {
    this.#admin = admin;
  }

  async verifyIdToken(idToken) {
    return this.#admin.auth().verifyIdToken(idToken);
  }

  async getUser(uid) {
    return admin.auth().getUser(uid);
  }

  async createCustomToken(uid) {
    return admin.auth().createCustomToken(uid);
  }
}
export default FireBaseAuthService;
