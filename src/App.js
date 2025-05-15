import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import {
  SearchBar,
  WeatherCard,
  ForecastList,
  WeatherBackground,
} from "components";
import {
  fetchWeatherData,
  fetchForecastData,
  fetchCityFromCoords,
} from "./services/weatherService";
import "./index.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const fetchWeather = async (location) => {
    console.log("Fetching weather for location:", location);
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast([]);

    try {
      const weatherData = await fetchWeatherData(location);
      const forecastData = await fetchForecastData(location);

      if (!weatherData || !weatherData.city) {
        throw new Error("Invalid location");
      }

      setWeather(weatherData);
      setForecast(forecastData.length > 0 ? forecastData : []);
    } catch (err) {
      setError("Incorrect location, please try again.");
      setWeather(null);
    }

    setLoading(false);
  };

  // Fetch the current city based on geolocation
  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const cityName = await fetchCityFromCoords(latitude, longitude);
            fetchWeather({ lat: latitude, lon: longitude });
          } catch (err) {
            setError("Unable to fetch city name.");
          }
        },
        (error) => {
          setError("Location access denied. Please enter a city manually.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  const handleCardClick = (location) => {
    console.log("ll**", location);
    fetchWeather(location);
    setShowFavorites(false); // Close favorites when a city is selected
  };

  return (
    <div className="main-container">
      <WeatherBackground
        weatherCondition={weather?.condition}
        isFavoritePage={showFavorites}
      />
      <Navbar variant="dark" className="head-nav">
        <Container>
          <Navbar.Brand>Weather App 🌤️</Navbar.Brand>
          <SearchBar onSearch={fetchWeather} />
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => setShowFavorites(!showFavorites)}
              style={{ whiteSpace: "nowrap" }}
            >
              {showFavorites ? (
                "Back to Weather"
              ) : (
                <div>
                  Favorite cities
                  <span className="badge badge-pill mb-2 ms-1 city-badge">
                    {favorites?.length}
                  </span>
                </div>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {showFavorites ? (
        <Container
          className={`${!favorites.length ? "favorites-container" : ""}`}
        >
          <h3 className="text-center my-4 head-title">Favorite cities</h3>
          {favorites.length > 0 ? (
            <Row>
              {favorites.map((fav) => (
                <Col key={fav.city} md={6} className="mb-4">
                  <WeatherCard
                    weather={fav}
                    updateFavorites={setFavorites}
                    isFavoritePage={showFavorites}
                    onCardClick={handleCardClick}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center">
              <p className="no-favorites">
                ⭐ No favorite locations yet! Add some by clicking the heart
                icon. ⭐
              </p>
            </div>
          )}
        </Container>
      ) : loading ? (
        <div className="d-flex justify-content-center align-items-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5 flex-column position-relative">
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              <WeatherCard weather={weather} updateFavorites={setFavorites} />
              <ForecastList forecast={forecast} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
