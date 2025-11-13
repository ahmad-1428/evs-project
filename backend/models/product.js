import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    externalId: {
      type: Number, // EscuelaJS product ID
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { // EscuelaJS uses "title" instead of "name"
      type: String,
      required: [true, "Product title is required"],
      minLength: [3, "Title must be at least 3 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      id: { type: Number },
      name: { type: String },
      image: { type: String },
    },
    images: {
      type: [String], // EscuelaJS returns an array of image URLs
      default: [],
    },
    countInStock: { type: Number, default: 100 }, // EscuelaJS doesn't provide stock, so default
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
