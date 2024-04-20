import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/order.js";

const router = express.Router();

router.route("/create-order").post(createOrder);
router.route("/allOrders").get(getAllOrders);
router.route("/:userId").get(getUserOrders);
router.route("/order-status-update/:orderId").patch(updateOrderStatus);
export default router;
