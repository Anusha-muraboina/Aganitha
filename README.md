# 🌦️ Weather Now — React + Vite + Open-Meteo API

## 👤 User Persona
**Name:** Jamie  
**Occupation:** Outdoor Enthusiast  
**Need:** Jamie wants to quickly check the **current weather conditions** for any city in the world.

---

## 🧭 Project Overview
**Weather Now** is a sleek, responsive, and modern weather application built with **React (Vite)** that allows users to search and view real-time weather information for any city globally.  
The app uses the **Open-Meteo API** (no authentication required) to display temperature, weather condition, and windspeed for the selected city.



<img width="1904" height="1023" alt="Screenshot 2025-10-29 182108" src="https://github.com/user-attachments/assets/6f01f1c5-8951-42c9-9668-f2f32a8decec" />

---

## 🚀 Features
- 🔍 **Search** weather by city name  
- 🌡️ Displays **temperature**, **windspeed**, and **condition**  
- 🏙️ Default city: **Bengaluru**  
- 📱 Fully **responsive** on mobile and desktop  
- ⚠️ Graceful **error handling** for invalid cities  
- 💨 Fast and **lightweight** app using Vite  

---

## 🧰 Tech Stack

**Frontend Framework** - React (Vite) 
**Styling** - CSS 
**API** -  Open-Meteo API + Open-Meteo Geocoding API 
**Language** - JavaScript 
**Deployment** -  StackBlitz 

---

## 🗂️ Folder Structure
```
weather-now/
├── public/
│   └── favicon.ico
├── src/
│   ├
|   |  ForecastCard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### Step 1️⃣ — Clone the repository
```bash
git clone https://github.com/<your-username>/weather-now.git
```

### Step 2️⃣ — Install dependencies
```bash
npm install
```

### Step 3️⃣ — Run the development server
```bash
npm run dev
```
Now visit [http://localhost:5173](http://localhost:5173) in your browser 🌍

---

## 🔑 APIs Used

### 🧭 Geocoding API
Used to fetch **latitude** and **longitude** from the city name:
```
https://geocoding-api.open-meteo.com/v1/search?name={cityName}
```

### 🌦️ Open-Meteo API
Used to fetch **current weather data**:
```
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
```

---

## 🧠 How It Works
1. User enters a **city name**.  
2. The app calls **Geocoding API** to fetch coordinates.  
3. Coordinates are sent to **Open-Meteo API** to get weather data.  
4. The UI displays temperature, windspeed, and condition dynamically.  
5. If the city isn’t found, an error message is displayed.  

---


## 💾 Example API Response
```json
{
  "latitude": 12.97,
  "longitude": 77.59,
  "current_weather": {
    "temperature": 27.3,
    "windspeed": 5.4,
    "weathercode": 2,
    "time": "2025-10-29T14:00"
  }
}
```

---

## 🌍 Deployment
You can deploy this project easily on:
- [StackBlitz](https://aganitha-5od3--5173--cf284e50.local-credentialless.webcontainer.io)


---

## 🧾 Level-wise Submission Requirements

### 🥇 Level 1 (50%)
- Share **ChatGPT link** of this project discussion.

### 🥈 Level 2 (30%)
- Deploy the app on **StackBlitz**.

### 🥉 Level 3 (20%)
- Share your **GitHub repo link** with:
  - Well-commented code  
  - `README.md` (this file)  
  - Clear folder structure  

---

## 🧑‍💻 Developer Notes
- Developed for **Jamie**, an outdoor enthusiast.  
- Focused on **speed**, **clarity**, and **simplicity**.  
- Built with ❤️ using **React + Vite + Open-Meteo API**.  
- Tested for responsive design on multiple devices.  
- Meets **Aganitha Take-Home Challenge** Level 3 (20%) requirement.  

---

## Conclusion
The **Weather Now App** helps Jamie — and anyone who loves the outdoors — quickly check real-time weather conditions for any city.  
Simple, fast, and accurate. 🌤️

---

✨ Built by [Anusha Muraboina] — Candidate ID: Naukri1025 ✨
