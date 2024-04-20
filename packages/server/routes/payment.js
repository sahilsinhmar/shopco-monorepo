import express from "express";
import { payment } from "../controllers/payment.js";

const router = express.Router();

router.route("/create-payment-intent").post(payment);

export default router;
