import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    category: {
      type: String,
      required: [true, "Please provide a category"],
    },
    type: { type: String, required: true },
    sizes: [{ type: String }],
    ratings: [
      {
        rating: { type: Number, min: 1, max: 5 },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    colors: [{ type: String }],
  },
  { timestamps: true }
);

const Products =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);
export default Products;
