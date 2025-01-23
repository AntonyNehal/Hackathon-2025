import express from "express";
import mongoose from "mongoose";
// import userRoutes from "./routes/user.route.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import User from "./models/user.models.js";
mongoose
  .connect(
    "mongodb+srv://nehal:hackathon@hackathon.f0few.mongodb.net/hackathon?retryWrites=true&w=majority&appName=hackathon"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log(err);
  });
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("server running on port 3000!");
});

// app.use("/api/user", userRoutes);

app.post("/api/register", async (req, res) => {
  try {
    const { email, phone, password, confirmPassword, ...rest } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...rest,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
