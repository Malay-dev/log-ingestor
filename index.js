import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import log_routes from "./Routes/log_routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const MONGO_USER = process.env.MONGO_USER || "mongodb-cfg";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_IP = process.env.MONGO_IP || "mongodb-sharded";
const MONGO_PORT = process.env.MONGO_PORT || 27017;

const DATABASE_URL = `mongodb://root:password123@${MONGO_IP}:${MONGO_PORT}/?authSource=admin `;

const connectWithRetry = () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("[server]: Connected to database..."))
    .catch((e) => {
      console.log(`[server]: ${e}`);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const Url_logger = (upperCase) => {
  if (typeof upperCase !== "boolean") {
    upperCase = true;
  }
  return (req, res, next) => {
    console.log(
      "Logging:",
      upperCase ? req.url.toUpperCase() : req.url.toLowerCase()
    );
    next();
  };
};
app.use(Url_logger(true));
app.use(express.json());

app.use("/logs", log_routes);

app.get("/", (req, res) => {
  res.send("This is the log-ingestor server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
