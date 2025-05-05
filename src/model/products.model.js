const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productModel = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = model("Product", productModel);

module.exports = Product;
