import { ConnectToDB } from "./src/config/database/database-connect.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import admin from "firebase-admin";
import drinkRoute from "./src/routes/drink.route.js";
import userRoute from "./src/routes/user.route.js";
import drinkPurchaseRoute from "./src/routes/drinkPurchase.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

const db = new ConnectToDB();
db.connect();

app.use("/drinkPurchase", drinkPurchaseRoute);
app.use("/drink", drinkRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
