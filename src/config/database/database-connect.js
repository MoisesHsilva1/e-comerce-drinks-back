const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

class ConnectToDB {
  #dbUrl;

  constructor(dbUrl = process.env) {
    this.#dbUrl = dbUrl;
  }

  async connnect() {
    try {
      await mongoose.connect(this.#dbUrl);
      console.log("connect success to the db!");
    } catch (err) {
      console.error("Failed to connect to the db", err);
    }
  }
}

module.exports = ConnectToDB;
