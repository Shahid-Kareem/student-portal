import React, { useEffect, useState } from "react";
import "./Weather.css";

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Islamabad&units=metric&appid=9db17c9e93d83b852f8bfd090b0db620"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          console.error(data.message);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="weather-page">
      <h2>🌦 Weather - Islamabad</h2>

      {weather?.main ? (
        <div className="weather-card">
          <h1>{weather.main.temp}°C</h1>
          <p>{weather.weather?.[0]?.main}</p>
          <p>🌡 Feels Like: {weather.main.feels_like}°C</p>

          <div className="weather-details">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind: {weather.wind.speed} km/h</p>
            <p>🌅 Sunrise:{" "}{weather &&  new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>🌇 Sunset:{" "}{weather &&  new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>

          
          </div>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}

export default Weather;