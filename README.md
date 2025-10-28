<!-- # Weather Forecast App

This is a simple React + Vite app that shows a 7-day forecast.
- Default city: Bengaluru
- Search by city name: shows 7-day forecast for queried city
- Uses Open-Meteo (no API key required)

Run locally:
```bash
npm install
npm run dev
```
Open http://localhost:5173 -->
# 🌦️ WeatherNow — Responsive 7-Day & Hourly Weather Forecast App

A modern, responsive weather web app built with **React + Vite**, showing a **7-day forecast** and **hourly weather** (with AM/PM format) for the selected day.  
By default, it loads weather details for **Bengaluru**. You can also search any city worldwide.

---

## 🚀 Features

✅ **Default City** — Bengaluru weather displayed automatically on load.  
✅ **Search Functionality** — Search any city to get updated forecasts.  
✅ **7-Day Forecast Cards** — Each card shows the max/min temperature and weather condition.  
✅ **Hourly Forecast** — Displays hourly weather (with AM/PM) for the selected day.   
✅ **Dynamic Styling** — Gradient backgrounds, glassmorphism effects, and hover animations.  
✅ **No API Key Needed** — Uses the free and open **Open-Meteo API**.  

---

## 🧠 Tech Stack

- ⚛️ **React 18+**
- ⚡ **Vite** (for fast development)
- 🎨 **CSS3** (custom responsive styling)
- 🌍 **Open-Meteo API** (for geocoding + weather data)

---

## 📦 Project Structure


weather-now-app/
├── public/
│ └── index.html
├── src/
│ ├── App.jsx
│ ├── ForecastCard.jsx
│ ├── index.css
│ └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── README.md