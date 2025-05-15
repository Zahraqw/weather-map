import { API_URLS, ICON_URL } from "../config/apiConfig";

export const fetchWeatherData = async (location) => {
  try {
    if (!location || !location.lat || !location.lon) {
      throw new Error("Missing latitude or longitude");
    }

    const url = API_URLS.CURRENT_WEATHER({
      lat: location.lat,
      lon: location.lon,
    });

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: ICON_URL(data.weather[0].icon),
      condition: data.weather[0].main,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
};

export const fetchForecastData = async (location) => {
  try {
    const url =
      typeof location === "string"
        ? API_URLS.FORECAST(location)
        : API_URLS.FORECAST({ lat: location.lat, lon: location.lon });

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const today = new Date().getDate();

    const nextDays = data.list
      .filter((item) => new Date(item.dt_txt).getDate() !== today)
      .filter((_, index) => index % 8 === 0);

    return nextDays.map((item) => ({
      day: new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      temperature: Math.round(item.main.temp),
      icon: ICON_URL(item.weather[0].icon),
    }));
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return [];
  }
};

// Reverse Geocoding to get city name from coordinates
export const fetchCityFromCoords = async (lat, lon) => {
  try {
    const res = await fetch(API_URLS.REVERSE_GEOCODING(lat, lon));
    const data = await res.json();
    return data[0]?.name || "Unknown Location";
  } catch (error) {
    console.error("Error fetching city name:", error);
    return "Unknown Location";
  }
};
