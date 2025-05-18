import mongoose from "mongoose";

const { Schema, model } = mongoose;

const drinkPurchaseModel = new Schema(
  {
    drink: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
    user: { type: Object, required: true },
    delivery: { type: String, required: true },
  },
  { timestamps: true }
);

const DrinkPurchaseModel = model("DrinkPurchase", drinkPurchaseModel);

export default DrinkPurchaseModel;
