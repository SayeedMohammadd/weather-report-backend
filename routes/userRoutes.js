const express = require("express");
const axios = require("axios");
const User = require("../models/User");

const router = express.Router();
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Add a new user
router.post("/add", async (req, res) => {
  try {
    const { email, lat, lon } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, location: { lat, lon } });
    await user.save();

    res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user location
router.put("/update-location", async (req, res) => {
  try {
    const { email, lat, lon } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { location: { lat, lon } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Location updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get weather data for a user
router.get("/weather/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ weatherData: user.weatherData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
