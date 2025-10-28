import React, { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";

const DEFAULT_CITY = "Bengaluru";

const weatherCodeToText = (code) => {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
  };
  return map[code] || "Unknown";
};


// 🌈 Choose image icon based on weather code
const getWeatherIcon = (code) => {
  if ([0].includes(code)) return "/icons/sun.png";
  if ([1, 2, 3].includes(code)) return "/icons/cloudy-day.png";
  if ([45, 48].includes(code)) return "/icons/fog.png";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "/icons/heavy-rain.png";
  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return "/icons/snow.png";
  if ([95, 96, 99].includes(code)) return "/icons/lightning.png";
  return "/icons/default.png";
};

export default function App() {
  const [query, setQuery] = useState("");
  const [forecast, setForecast] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchForecastByCity(DEFAULT_CITY);
  }, []);

  const fetchForecastByCity = async (cityName) => {
    setLoading(true);
    setError("");
    setForecast(null);
    setHourlyData(null);
    setSelectedDate(null);

    try {
      // 1️⃣ Geocode city
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1`
      );
      const geo = await geoRes.json();
      if (!geo.results?.length) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country, timezone } = geo.results[0];

      // 2️⃣ Fetch daily + hourly data
      const params =
        "daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto";
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${params}`
      );
      const weather = await weatherRes.json();

      const data = {
        city: name,
        country,
        timezone: weather.timezone || timezone,
        dates: weather.daily.time,
        temp_max: weather.daily.temperature_2m_max,
        temp_min: weather.daily.temperature_2m_min,
        weathercode: weather.daily.weathercode,
        hourly: {
          time: weather.hourly.time,
          temp: weather.hourly.temperature_2m,
          code: weather.hourly.weathercode,
        },
      };

      setForecast(data);

      // 🌞 Default: today's hourly weather (from current time)
      const today = data.dates[0];
      setSelectedDate(today);
      filterTodayHours(data, today);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchForecastByCity(query.trim());
    setQuery("");
  };

  // 3️⃣ Filter current day’s hours (start from now)
  const filterTodayHours = (data, date) => {
    const now = new Date();
    const hours = data.hourly.time
      .map((time, i) => ({
        time,
        temp: data.hourly.temp[i],
        code: data.hourly.code[i],
      }))
      .filter((item) => item.time.startsWith(date))
      .filter((item) => new Date(item.time) >= now); // only future hours
    setHourlyData(hours);
  };

  // 4️⃣ When clicking another day
  const handleDayClick = (date) => {
    setSelectedDate(date);

    const hours = forecast.hourly.time
      .map((time, i) => ({
        time,
        temp: forecast.hourly.temp[i],
        code: forecast.hourly.code[i],
      }))
      .filter((item) => item.time.startsWith(date));

    setHourlyData(hours);
  };

  // 5️⃣ Convert to AM/PM
  const formatHour = (timeStr) => {
    const date = new Date(timeStr);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours} ${ampm}`;
  };

  return (
    <div className="weather-sec">
    <div className="app">
      <header>
        <h1>Weather Forecast — 7 Days</h1>
        <form onSubmit={onSearch} className="search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city (e.g. London)"
          />
          <button type="submit">Search</button>
        </form>
        <div className="note">Default: Bengaluru</div>
      </header>

      <main>
        {loading && <div className="msg">Loading…</div>}
        {error && <div className="msg error">{error}</div>}

        {forecast && (
          <>
            <h2 className="location">
              {forecast.city}, {forecast.country}
            </h2>
            <div className="grid">
              {forecast.dates.map((d, i) => (
                <div
                  key={d}
                  onClick={() => handleDayClick(d)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedDate === d ? "2px solid #0077cc" : "2px solid transparent",
                    borderRadius: "10px",
                  }}
                >
                  <ForecastCard
                    date={d}
                    max={forecast.temp_max[i]}
                    min={forecast.temp_min[i]}
                    code={forecast.weathercode[i]}
                    desc={weatherCodeToText(forecast.weathercode[i])}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selectedDate && hourlyData && (
          <div className="hourly">
            <h3>Hourly Forecast for {selectedDate}</h3>
            <div className="hour-grid">
              {hourlyData.length === 0 && (
                <div className="msg">No remaining hours today 🌙</div>
              )}
              {hourlyData.map((h) => (
                <div key={h.time} className="hour-card">
                  <div className="time">{formatHour(h.time)}</div>
                   <img
                      src={getWeatherIcon(h.code)}
                      alt={weatherCodeToText(h.code)}
                      style={{ width: "40px", height: "40px" }}
                    />
                  <div className="temp">{Math.round(h.temp)}°C</div>
                  <div className="desc">{weatherCodeToText(h.code)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* <footer>
        <small>Data from Open-Meteo • No API key required</small>
      </footer> */}
    </div>

    </div>
  );
}
