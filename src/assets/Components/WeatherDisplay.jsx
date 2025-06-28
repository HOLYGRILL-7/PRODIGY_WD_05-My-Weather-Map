import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null; // Don't render anything if there's no weather data

  return (
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-semibold mb-2">
        Weather in {weather.name}
      </h2>
      <p>🌡️ Temperature: {weather.main.temp} °C</p>
      <p>🌤️ Condition: {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
