import mongoose from "mongoose";

const { Schema, model } = mongoose;

const drinkModel = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    qtd: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const DrinkModel = model("Drink", drinkModel);

export default DrinkModel;
