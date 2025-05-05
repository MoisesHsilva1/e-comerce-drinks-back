const express = require("express");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

dotenv.config();
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 3000;

app.use(morgan("prod"));
app.use(cors());

app.use("/", (req, res) => {
  res.send("Hello server");
});

const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost-cert.pem")),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});
