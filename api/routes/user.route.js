import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/user.models.js";
const router = express.Router();
router.get("/test", (req, res) => {
  res.json({ message: "api working" });
});

// router.post("/register", async (req, res) => {
//   try {
//     const { email, phone, password, confirmPassword, ...rest } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       ...rest,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });
export default router;
