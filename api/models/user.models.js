import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    dob: { type: Date, required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    highschool: {
      board: { type: String, required: true },
      year: { type: String, required: true },
      marks: { type: Number, required: true },
    },
    intermediate: {
      board: { type: String, required: true },
      year: { type: String, required: true },
      marks: { type: Number, required: true },
    },
    graduation: {
      board: { type: String, required: true },
      year: { type: String, required: true },
      marks: { type: Number, required: true },
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
