import ForecastCard from "./ForecastCard";
import "./ForcastCard.css";
const ForecastList = ({ forecast }) => {
  return (
    <div className="d-flex list-cards position-absolute">
      {forecast.map((day, index) => (
        <ForecastCard day={day} key={index} />
      ))}
    </div>
  );
};

export default ForecastList;
