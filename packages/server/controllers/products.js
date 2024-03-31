import Products from "../models/product.js";
import handleUpload from "../utils/handleUpload.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, type, sizes, colors } =
      req.body;

    
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !type ||
      !sizes ||
      !colors
    ) {
      return res
        .status(400)
        .json({ msg: "Please provide all the information" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "Images are not uploaded" });
    }

    const results = await Promise.all(req.files.map(handleUpload));
    const secure_urls = results.map((result) => result.secure_url);

    const newProduct = new Products({
      name,
      description,
      price,
      imageURL: secure_urls,
      category,
      type,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
    });

    await newProduct.save();

    res
      .status(201)
      .json({ status: "SUCCESS", message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
