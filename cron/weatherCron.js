const axios = require("axios");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Fetch weather and send reports
const sendWeatherReports = async () => {
  try {
    const users = await User.find();
    
    for (const user of users) {
      const { lat, lon } = user.location;
      
      // Fetch weather data
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      const { temp } = weatherRes.data.main;
      const description = weatherRes.data.weather[0].description;

      // Update DB
      user.weatherData.push({ temperature: temp, description });
      await user.save();

      // Send email
      const mailOptions = {
        from: EMAIL_USER,
        to: user.email,
        subject: "Hourly Weather Report",
        text: `Current temperature: ${temp}°C \nWeather: ${description}`,
      };

      await transporter.sendMail(mailOptions);
    }
    
    console.log("Weather reports sent successfully");
  } catch (err) {
    console.error("Error sending weather reports:", err.message);
  }
};

module.exports = sendWeatherReports;
