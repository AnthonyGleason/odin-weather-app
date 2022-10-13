import "./styles/styles.css";
import Display from "./scripts/display.js";
import Weather from "./scripts/weather.js";

let WEATHERCONTROLLER = new Weather();

//get current weather data for city
WEATHERCONTROLLER.populateWeatherData();