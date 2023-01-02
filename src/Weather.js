import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Weather() {
  let [load, setLoad] = useState(false);
  let [city, setCity] = useState(null);
  let [searchedCity, setSearchedCity] = useState(null);
  let [temp, setTemp] = useState(null);
  let [des, setDes] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);

  function updateInfo(response) {
    setTemp(`${Math.round(response.data.main.temp)}°C`);
    setDes(`${response.data.weather[0].description}`);
    setHumidity(`Humidity: ${response.data.main.humidity}%`);
    setWind(`Wind: ${response.data.wind.speed}km/h`);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    setLoad(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ece3d24c64eca2f5b04e85550d590173&units=metric`;
    axios.get(url).then(updateInfo);
    setSearchedCity(`${city}`);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control"
        placeholder="Search the city..."
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        onChange={updateCity}
      />
      <button
        type="submit"
        className="btn btn-outline-secondary"
        id="button-addon2"
      >
        Search
      </button>
      <button
        type="submit"
        className="btn btn-outline-secondary"
        id="button-addon2"
      >
        Current
      </button>
    </form>
  );

  let forecastSection = (
    <div className="row align-items-center forecast-details">
      <div className="col">
        <ul className="no-bullets">
          <h6>Mon</h6>
          <li>
            <img src={icon} alt="icon" width="70%" />
          </li>
          <li>{temp}</li>
          <li>{des}</li>
        </ul>
      </div>
      <div className="col">
        <ul className="no-bullets">
          <h6>Tue</h6>
          <li>
            <img src={icon} alt="icon" width="70%" />
          </li>
          <li>{temp}</li>
          <li>{des}</li>
        </ul>
      </div>
      <div className="col">
        <ul className="no-bullets">
          <h6>Wed</h6>
          <li>
            <img src={icon} alt="icon" width="70%" />
          </li>
          <li>{temp}</li>
          <li>{des}</li>
        </ul>
      </div>
      <div className="col">
        <ul className="no-bullets">
          <h6>Thu</h6>
          <li>
            <img src={icon} alt="icon" width="70%" />
          </li>
          <li>{temp}</li>
          <li>{des}</li>
        </ul>
      </div>
      <div className="col">
        <ul className="no-bullets">
          <h6>Fri</h6>
          <li>
            <img src={icon} alt="icon" width="70%" />
          </li>
          <li>{temp}</li>
          <li>{des}</li>
        </ul>
      </div>
    </div>
  );

  if (load) {
    return (
      <div>
        {form}
        <ul className="no-bullets">
          <h1>{searchedCity}</h1>
          <li>{temp}</li>
          <li>
            <img src={icon} alt="icon" />
          </li>
          <li>{des}</li>
          <li>{humidity}</li>
          <li>{wind}</li>
        </ul>
        <hr />
        {forecastSection}
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
