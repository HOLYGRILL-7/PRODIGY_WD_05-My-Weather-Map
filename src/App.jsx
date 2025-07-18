import React from "react";
import { useState } from "react";
import SearchBar from "./assets/Components/SearchBar";
import ErrorMessage from "./assets/Components/ErrorMessage";
import WeatherDisplay from "./assets/Components/WeatherDisplay";
const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (city.trim() === "") return;

    try {
      setError(""); //clears previous errors.

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("City not found or API error");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.log(err);
      setWeather(null);
      setError("could not fetch weather data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 flex items-center justify-center p-4">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <SearchBar city={city} onSearch={fetchWeather} setCity={setCity} />
        <ErrorMessage message={error} />
        <WeatherDisplay weather={weather} />
      </div>
    </div>
  );
};

export default App;
