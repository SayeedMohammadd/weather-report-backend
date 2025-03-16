require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cron = require("node-cron");
const sendWeatherReports = require("./cron/weatherCron");

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Weather Report API is Running...");
});

// Run cron job every 3 hours
cron.schedule("0 */3 * * *", sendWeatherReports);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
