import Products from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
