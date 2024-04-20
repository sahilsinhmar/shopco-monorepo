import Order from "../models/order.js";
import User from "../models/user.js";
import { generateOrderNumber } from "../utils/OrderNumber/GenerateOrderNumber.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    if (!userId || !products || !totalPrice) {
      return res
        .status(400)
        .json({ msg: "Please provide all the information" });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({ msg: "Please sign up or login to order " });
    }

    const newOrder = new Order({
      orderNo: generateOrderNumber(),
      buyerId: user._id,
      buyerName: user.name,
      buyerEmail: user.email,
      items: products,
      totalAmount: totalPrice,
      orderStatus: "pending",
      remark: "",
    });

    await newOrder.save();
    res.status(201).json({
      status: "SUCCESS",
      msg: "Order has been confirmed and stored  ",
      data: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    const userOrders = await Order.find({ buyerId: userId });

    if (userOrders.length === 0) {
      return res.status(204).json({ msg: "You don't have any orders." });
    }

    res.status(200).json({ userOrders });
  } catch (error) {}
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log(orderId, status);

    const temp_order = await Order.findOne({ _id: orderId });
    if (!temp_order) {
      return res.status(204).json({ msg: "No order found" });
      console.log(temp_order);
    }
    temp_order.orderStatus = status;
    await temp_order.save();

    console.log(temp_order);

    res.status(200).json({ msg: `Order status updated to ${status} ` });
  } catch (error) {
    res.status(500).json({ msg: "Error occurred while canceling your order" });
  }
};
