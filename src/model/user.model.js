import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userModel = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    telphone: { type: Number, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = model("User", userModel);

export default UserModel;
