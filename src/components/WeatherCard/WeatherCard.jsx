import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { HeartFill, Heart } from "react-bootstrap-icons";
import "./WeatherCard.css";

const WeatherCard = ({
  weather,
  updateFavorites,
  isFavoritePage,
  onCardClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.some((fav) => fav.city === weather.city));
  }, [weather.city]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      storedFavorites = storedFavorites.filter(
        (fav) => fav.city !== weather.city
      );
    } else {
      // Ensure the `weather` object includes lat and lon
      const updatedWeather = {
        ...weather,
        coords: {
          lat: weather.latitude || 0, // Ensure you get latitude from the data (or use 0 as fallback)
          lon: weather.longitude || 0, // Same for longitude
        },
      };

      storedFavorites.push(updatedWeather);
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);

    if (updateFavorites) updateFavorites(storedFavorites);
  };

  const handleCardClick = () => {
    // Ensure weather object contains latitude and longitude
    const location = weather.coords || { lat: 0, lon: 0 };
    onCardClick(location);
  };

  return (
    <Card
      className={`${isFavoritePage ? "weather-card-favorite" : "weather-card"}`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex align-items-center weather-body">
        <div className="d-flex justify-content-between">
          <div className="weather-icon">
            <img src={weather.icon} alt={weather.description} width="100%" />
          </div>
          <div className="weather-info">
            <p className="weather-date">Today</p>
            <h2 className="weather-city">{weather.city}</h2>
            <h3 className="weather-temp">{weather.temperature}°C</h3>
            <p className="weather-status">{weather.description}</p>
          </div>
          <div className="favorite-icon" onClick={toggleFavorite}>
            {isFavorite ? (
              <HeartFill color="red" size={24} />
            ) : (
              <Heart color="gray" size={24} />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
