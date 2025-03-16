const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  weatherData: [
    {
      date: { type: Date, default: Date.now },
      temperature: Number,
      description: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
