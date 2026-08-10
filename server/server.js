const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// In-memory data storage (restarts when you restart the server)
let users = [];
let alerts = [
  {
    _id: "1",
    title: "Flash Flood Warning - Sector 4",
    severity: "red",
    category: "Flood",
    location: "River Basin & Lowlands",
    shelter: "Community Hall (1.2 km)",
    description: "Water levels rising rapidly near the main river basin. Residents in low-lying areas must evacuate immediately.",
    createdAt: new Date(),
  },
];

console.log("Running server with in-memory storage (No MongoDB required!)");

// Register Route
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role } = req.body;
  
  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const newUser = { id: Date.now().toString(), name, email, password, role: role || "citizen" };
  users.push(newUser);
  
  res.status(201).json({ message: "User registered successfully", user: newUser });
});

// Login Route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  
  res.json({ message: "Login successful", user });
});

// Get All Alerts Route
app.get("/api/alerts", (req, res) => {
  res.json(alerts);
});

// Create Alert Route (Authority)
app.post("/api/alerts", (req, res) => {
  const { title, severity, category, location, shelter, description } = req.body;
  
  const newAlert = {
    _id: Date.now().toString(),
    title,
    severity,
    category,
    location,
    shelter,
    description,
    createdAt: new Date(),
  };
  
  alerts.unshift(newAlert); // Add to beginning of array
  res.status(201).json({ message: "Emergency alert broadcasted successfully", alert: newAlert });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));