import React, { useState, useCallback } from "react";

const SearchBar = ({ city, setCity, onSearch, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          onClick={onSearch}
          disabled={isLoading || !city.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "..." : "Search"}
        </button>
      </div>
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
      {message}
    </div>
  );
};

const WeatherDisplay = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  if (!weather) return null;

  const { main, weather: weatherArray, name, sys } = weather;
  const weatherInfo = weatherArray[0];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {name}, {sys.country}
      </h2>
      
      <div className="mb-4">
        <div className="text-5xl font-bold text-gray-700 mb-1">
          {Math.round(main.temp)}°C
        </div>
        <p className="text-lg text-gray-600 capitalize">
          {weatherInfo.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <p className="font-semibold">Feels like</p>
          <p>{Math.round(main.feels_like)}°C</p>
        </div>
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Min / Max</p>
          <p>{Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°</p>
        </div>
        <div>
          <p className="font-semibold">Pressure</p>
          <p>{main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = useCallback(async () => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(`Could not fetch weather data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [city, API_KEY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Weather App
        </h1>
        
        <SearchBar 
          city={city} 
          setCity={setCity} 
          onSearch={fetchWeather} 
          isLoading={isLoading}
        />
        
        <ErrorMessage message={error} />
        
        <WeatherDisplay weather={weather} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;