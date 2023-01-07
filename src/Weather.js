import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Weather() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();

  //Data to be updated
  let [load, setLoad] = useState(false);
  let [city, setCity] = useState(null);
  let [searchedCity, setSearchedCity] = useState(null);
  let [temp, setTemp] = useState(null);
  let [des, setDes] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [cityLat, setCityLat] = useState(null);
  let [cityLon, setCityLon] = useState(null);

  //weather api details
  let units = `metric`;
  let apiKey = `ece3d24c64eca2f5b04e85550d590173`;
  let apiURLMain = `https://api.openweathermap.org/data/2.5/`;
  let apiURLDefault = `${apiURLMain}weather?q=${city}&units=${units}&appid=${apiKey}`;
  let apiURLForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=${units}&exclude=minutely,hourly,alerts&appid=${apiKey}`;

  function updateForecast(response) {
    console.log(response);
    console.log(days[today.getDay() + 1]);
  }

  function updateInfo(response) {
    console.log(response);
    setSearchedCity(`${response.data.name}`);
    setTemp(`${Math.round(response.data.main.temp)}`);
    setDes(`${response.data.weather[0].main}`);
    setHumidity(`Humidity: ${response.data.main.humidity}%`);
    setWind(`Wind: ${response.data.wind.speed}km/h`);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    setCityLat(`${response.data.coord.lat}`);
    setCityLon(`${response.data.coord.lon}`);
    axios.get(apiURLForecast).then(updateForecast);
    setLoad(true);
  }

  function errorMsg() {
    alert(`Sorry, we do not have the data.`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(apiURLDefault).then(updateInfo).catch(errorMsg);

    //setSearchedCity(`${city}`);
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
          <li>
            {temp} <span className="units">°C | °F</span>
          </li>
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
