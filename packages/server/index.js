import express from "express";
import "dotenv/config";
import { connectToDB } from "./db/connect.js";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "../server/routes/auth.js";
import { v2 as cloudinary } from "cloudinary";
import { verifyToken } from "./middleware/Authenticate.js";
import proudctsRouter from "./routes/products.js";
import multer from "multer";
import { createProduct } from "./controllers/products.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

const storage = new multer.memoryStorage();

// multer
const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

app.use("/api/v1/auth", authRouter);

app.post(
  "/api/v1/createproduct",
  verifyToken,
  upload.array("images"),
  createProduct
);

app.use("/api/v1/products", verifyToken, proudctsRouter);

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
