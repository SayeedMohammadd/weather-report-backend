# Weather Report Backend

## Overview
This is a Node.js backend API that allows users to store their emails and locations, fetch weather data, and receive automated weather reports via email every 3 hours. The application uses MongoDB for data storage, OpenWeatherMap for fetching weather updates, and Nodemailer for sending emails.

## Features
- Add users with email and location (latitude, longitude)
- Update users' location
- Fetch weather data for a given user
- Automatically fetch weather updates every 3 hours and send email reports
- OpenAI/Gemini integration for generating weather summaries (optional)
- Deployed on Vercel (or AWS)

## Tech Stack
- **Node.js & Express** - Backend API
- **MongoDB & Mongoose** - Database
- **Axios** - Fetch weather data from OpenWeatherMap
- **Nodemailer** - Email service
- **Node-cron** - Scheduled weather report
- **Google Cloud API** - Convert coordinates to city name
- **Vercel/AWS** - Deployment

## Installation

### Prerequisites
- Node.js & npm installed
- MongoDB instance (local or MongoDB Atlas)
- OpenWeatherMap API key
- Gmail account with App Password for email sending

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-report-backend.git
   cd weather-report-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   OPENWEATHER_API_KEY=your_openweathermap_api_key
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### 1. Add a User
**POST** `/api/users/add`
```json
{
  "email": "user@example.com",
  "lat": 37.7749,
  "lon": -122.4194
}
```

### 2. Update User Location
**PUT** `/api/users/update-location`
```json
{
  "email": "user@example.com",
  "lat": 40.7128,
  "lon": -74.0060
}
```

### 3. Get Weather Data for a User
**GET** `/api/users/weather/{email}`

## Automated Weather Report
- The backend fetches weather data every **3 hours** and sends an email report to all users.
- The email includes the temperature, weather description, and an AI-generated summary (if OpenAI/Gemini is enabled).

## Deployment

### Deploy on Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the project:
   ```sh
   vercel
   ```

### Deploy on AWS
- Use **EC2** for hosting
- Use **MongoDB Atlas** for database
- Use **PM2** for process management

## Postman Collection
A Postman collection is included for easy API testing.

## License
This project is licensed under the MIT License.

---
For any issues, feel free to open an issue on GitHub!

