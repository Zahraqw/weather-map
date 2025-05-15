export const API_KEY = "b8264670191ad883585c98a0fcc121dd";

export const API_URLS = {
  CURRENT_WEATHER: (location) =>
    typeof location === "string"
      ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`,

  FORECAST: (location) =>
    typeof location === "string"
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
      : `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`,

  REVERSE_GEOCODING: (lat, lon) =>
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
};

export const ICON_URL = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;
