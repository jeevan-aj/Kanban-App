import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'

const app = express();
const port = 3000;


app.use(express());
app.use(bodyParser.json());
dotenv.config();
app.use(cors())

mongoose
  .connect(process.env.mongo_uri)
  .then(console.log("connected"))
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

//routes
app.use("/api/auth", authRoutes);
