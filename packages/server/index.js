import express from "express";
import "dotenv/config";
import { connectToDB } from "./db/connect.js";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "../server/routes/auth.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
