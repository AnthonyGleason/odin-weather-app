import Display from "./display.js";

//import date object
let Date = function (){
    this.todaysDate = "";
    this.currentTime = "";
};

//declare location object
let Location = function(){
    //Set default search location to Central Park
    this.locationName = "Central Park";
};



//declare temperature object
let Temperature = function(){
    this.currentTemperature = "";
    this.todaysHigh = "";
    this.feelsLike = "";
    this.temperatureUnitType = "F";
};

//toggles temperature units between F and C
Temperature.prototype.toggleUnits = function (){
    this.temperatureUnitType==="F" ? this.temperatureUnitType="C" : this.temperatureUnitType="F";
};

/* when the default weather object is first initalized
we have not fetched information from the openweather api yet
therefore we will initalize properties with "" placeholder. */
let Weather = function(){
    this.apiResponse = "";
    this.date = new Date();

    /* all display related methods and properties
    are on the display object. */
    this.display = new Display();
    this.humidity = "";
    this.forecast = "";
    this.location = new Location();
    this.searchInput = "";
    this.temperature = new Temperature();
    this.windSpeed = "";
};

export default Weather;