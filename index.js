import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_IP = process.env.MONGO_IP || "mongo-database";
const MONGO_PORT = process.env.MONGO_PORT || 27017;

const DATABASE_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

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

app.get("/", (req, res) => {
  res.send("This is the log-ingestor server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
