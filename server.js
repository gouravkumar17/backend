const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://gk1917:gk1917@cluster0.ez4qehi.mongodb.net/pepdata")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));
const User = mongoose.model("User", { name: String, email: String, dob: String, password: String });
app.post("/signup", async (req, res) => {
  const user = new User(req.body) 
  await user.save();
  res.json({ message: "Signup Successful!" });
});
app.post("/signin", async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user) {
      res.json({ success: true, message: "Sign In Successful!", user });
    } else {
      res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }
  });
app.get("/products", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });
    res.json(JSON.parse(data));
  });
});
app.listen(5000, () => console.log("Server running on port 5000"));
