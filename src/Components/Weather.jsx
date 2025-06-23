import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import axios from "axios";

const Weather = () => {
  const [tem, setTem] = useState({});
  const [input, setInput] = useState("");
  const [city, setCity] = useState("kolkata");
  const [unit, setUnit] = useState("metric");

  const apiKey = "c5f54a7f0e09e168b6f47491a1d5cd50";
  const weatherapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  useEffect(() => {
    axios
      .get(weatherapi)
      .then((res) =>{
         setTem(res.data)
      })
      .catch((err) => console.log(err));
  }, [city, unit]);

  const handleSub = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input.trim());
      setInput("");
    }
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "clouds":
        return cloud_icon;
      case "clear":
        return clear_icon;
      case "drizzle":
        return drizzle_icon;
      case "rain":
        return rain_icon;
      case "snow":
        return snow_icon;
      default:
        return clear_icon;
    }
  };

  const { main, wind, name, weather } = tem;

  return (
    <div className="weather">
      <div className="search-bar">
        <form onSubmit={handleSub}>
          <input
            type="text"
            placeholder="Search city"
            name="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <img src={search_icon} alt="Search" />
          </button>
        </form>
      </div>

      <div className="unit-toggle">
        <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}>
          Show in {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      {weather?.[0]?.main && (
        <img
          src={getWeatherIcon(weather[0].main)}
          alt={weather[0].main}
          className="weather-icon"
        />
      )}

      <p className="temperature">
        {main ? Math.floor(main.temp) : "--"}°{unit === "metric" ? "C" : "F"}
      </p>
      <p className="location">{name}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="Humidity" />
          <div>
            <p>{main ? Math.floor(main.humidity) : "--"}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="Wind Speed" />
          <div>
            <p>
              {wind
                ? unit === "metric"
                  ? `${(wind.speed * 3.6).toFixed(1)} km/h`
                  : `${wind.speed.toFixed(1)} mph`
                : "--"}
            </p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
