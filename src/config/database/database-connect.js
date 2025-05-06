import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export class ConnectToDB {
  #dbUrl;

  constructor(dbUrl = process.env.DATABASE_URL) {
    this.#dbUrl = dbUrl;
  }

  async connect() {
    try {
      await mongoose.connect(this.#dbUrl);
      console.log("Connect success to the db!");
    } catch (err) {
      console.error("Failed to connect to the db", err);
    }
  }
}
