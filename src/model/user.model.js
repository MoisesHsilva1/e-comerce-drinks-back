import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userModel = new Schema(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    firebaseUid: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = model("User", userModel);

export default UserModel;
