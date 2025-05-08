import express from "express";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import { ConnectToDB } from "./src/config/database/database-connect.js";
import drinkRoute from "./src/routes/drink.route.js";
import userRoute from "./src/routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const db = new ConnectToDB();
db.connect();

app.use("/drink", drinkRoute);
app.use("/user", userRoute);

const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost-cert.pem")),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});
