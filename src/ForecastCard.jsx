import React from "react";

export default function ForecastCard({ date, max, min, code, desc }) {
  const d = new Date(date);
  const day = d.toLocaleDateString(undefined, { weekday: "short" });
  const label = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  // 🖼️ Image icons based on code
  const getWeatherIcon = (code) => {
    if ([0].includes(code)) return "/icons/most-sunny.png";               
    if ([1, 2].includes(code)) return "/icons/partly-cloudy.png";    
    if ([3].includes(code)) return "/icons/cloudy-day.png";              
    if ([45, 48].includes(code)) return "/icons/fog.png";            
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "/icons/heavy-rain.png"; 
    if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return "/icons/snow.png";     
    if ([95, 96, 99].includes(code)) return "/icons/lightning.png";    
    return "/icons/rainbow.png";      
  };

  return (
    <div className="card">
      <div className="date">{day}</div>
      <div className="label">{label}</div>

      <div
        className="weather"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div className="icon">
          <img
            src={getWeatherIcon(code)}
            alt={desc}
            style={{ width: "45px", height: "45px" }}
          />
        </div>
        <div className="desc">{desc}</div>
      </div>

      <div className="temps">
        <span className="max">{Math.round(max)}°</span>
        <span className="min">{Math.round(min)}°</span>
      </div>
    </div>
  );
}
