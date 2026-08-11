const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import your existing models
const User = require("./models/User");
const Alert = require("./models/Alert");

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect to MongoDB

const MONGO_URI = "mongodb+srv://Isha:isha123@cluster0.lgryfaj.mongodb.net/lastmile-alert?appName=Cluster0";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" Successfully connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// --- ROUTES ---

// Register Route
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create and save the new user
    const newUser = new User({ name, email, password, role: role || "citizen" });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user matching both email and password
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Get All Alerts Route
app.get("/api/alerts", async (req, res) => {
  try {
    // Fetch all alerts and sort by newest first
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// Create Alert Route (Authority)
app.post("/api/alerts", async (req, res) => {
  try {
    const { title, severity, category, location, shelter, description } = req.body;
    
    const newAlert = new Alert({
      title,
      severity,
      category,
      location,
      shelter,
      description,
    });
    
    await newAlert.save();
    res.status(201).json({ message: "Emergency alert broadcasted successfully", alert: newAlert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create alert" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));