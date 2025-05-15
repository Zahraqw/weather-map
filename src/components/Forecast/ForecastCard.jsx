import React from "react";
import { Card } from "react-bootstrap";

const ForecastCard = ({ day }) => {
  return (
    <Card className="text-center shadow-sm cards-day me-3">
      <Card.Body>
        <Card.Title>{day.day}</Card.Title>
        <img src={day.icon} alt={day.description} width="50" />
        <h4>{day.temperature}°C</h4>
      </Card.Body>
    </Card>
  );
};

export default ForecastCard;
