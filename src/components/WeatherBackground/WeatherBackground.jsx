import React from "react";
import "./WeatherBackground.css";

const weatherBackgrounds = {
  Clear: "sunny-bg",
  Clouds: "cloudy-bg",
  Rain: "rainy-bg",
  Snow: "snowy-bg",
  Thunderstorm: "storm-bg",
  Mist: "mist-bg",
  Fog: "fog-bg",
};

const WeatherBackground = ({ weatherCondition, isFavoritePage = false }) => {
  const backgroundClass = isFavoritePage
    ? "favorite-bg"
    : weatherBackgrounds[weatherCondition] || "default-bg";
  return <div className={`weather-background ${backgroundClass}`} />;
};

export default WeatherBackground;
