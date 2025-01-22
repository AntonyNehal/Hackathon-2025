import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
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
app.listen(3000, () => {
  console.log("server running on port 3000!");
});

app.use("/api/user", userRoutes);
