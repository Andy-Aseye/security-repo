import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/connectToDb.js";
import cveRoute from "./routes/cve.js";
import cookierParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { fetchAndLogCves } from "./utils/fetchCVE.js";

dotenv.config();
const app = express();
const port = 3000;



mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from Mongodb");
});

//enable cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//parse-cookies
app.use(cookierParser());

//parse json request
app.use(express.json());

//routes
app.use("/api/cve", cveRoute);


connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`listening on port: ${port}`);
  });
});
