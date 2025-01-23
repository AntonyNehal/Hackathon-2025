import express from "express";
import mongoose from "mongoose";
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
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("server running on port 3000!");
});

app.post("/api/register", async (req, res) => {
  try {
    console.log(req.body); // Log the incoming data to check what you are receiving

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
    console.error("Error registering user:", error); // Improved error logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the email and password are provided
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare the password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // User authenticated successfully, send user data (excluding password)
//     const { password: userPassword, ...userData } = user.toObject(); // Remove password from response
//     res.status(200).json({ message: "Login successful", userData });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// }); // Adjust according to your project structure
// Example backend login route in Express
// Example backend login route in Express
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password (ensure you hash the password properly)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send user data including email
    res.status(200).json({
      userData: { email: user.email, name: user.name }, // Send the email
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    // Get email from query parameters
    const { email } = req.query; // Assume you're passing email as query parameter

    if (!email) {
      return res.status(400).json({ message: "Email not provided" });
    }

    const user = await User.findOne({ email }).select("-password"); // Find user by email and exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
