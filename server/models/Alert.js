const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    severity: { type: String, enum: ["red", "amber", "info"], required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    shelter: { type: String, required: true },
    description: { type: String, required: true },
    acknowledgedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", AlertSchema);