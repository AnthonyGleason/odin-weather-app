import "./styles/styles.css";
import Display from "./scripts/display.js";
import Weather from "./scripts/weather.js";

let WEATHERCONTROLLER = new Weather();
let DISPLAYCONTROLLER = new Display();

DISPLAYCONTROLLER.addButtonListeners(WEATHERCONTROLLER);
