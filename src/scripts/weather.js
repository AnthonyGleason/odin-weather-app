let Api = function (){
    this.response = undefined;
    //The search input goes in the middle of the two array elements
    this.request = ["api.openweathermap.org/data/2.5/weather?q=","&APPID="];
    this.searchInput = "London";

    //get data from api
    Api.prototype.getWeatherData = async function (){
        try{
            //build the api call according to the openweather docs
            await fetch('https://'+this.request[0]+this.searchInput+this.request[1],{
                mode: 'cors'
            }).then(response=>{
                return response.json();
            }).then(response=>{
                this.response=response;
                return response;
            })
        }catch(error){
            console.log("Error, "+ error);
            return error;
        }
    };
};
let Coord = function (){
    this.longitude = undefined;
    this.latitude = undefined;
};
let Forecast = function (){
    this.weather = undefined;
    this.description = undefined;
};
let Location = function (){
    this.coord = new Coord();
    this.country = undefined;
    this.name = undefined;
};
let Temp = function(){
    //temperature retrieved from the api is in kelvin
    this.k = undefined;
    this.c = undefined;
    this.f = undefined;
    this.todaysHigh = undefined;
    this.feelsLike = undefined;
    this.unitType = "F";
    
    //converts temperature from kelvin to C
    Temp.prototype.convertTempC = function (){
        this.c = this.k-273.15;
    };

    //converts temperature from kelvin to F
    Temp.prototype.convertTempF = function (){
        this.f = (this.k - 273.15) * (9/5) + 32;
    };

    //toggles temperature units between F and C
    Temp.prototype.toggleUnits = function (){
        this.tempUnitType==="F" ? this.tempUnitType="C" : this.tempUnitType="F";
    };
};
/* when the default weather object is first initalized
we have not fetched information from the openweather api yet
therefore we will initalize properties with "" placeholder. */
let Weather = function(){
    this.api = new Api();
    this.date = undefined;
    this.humidity = undefined;
    this.forecast = new Forecast();
    this.location = new Location();
    this.temp = new Temp();
    this.windSpeed = undefined;

    //get user input from search input element
    Weather.prototype.populateWeatherData = async function (){
        //Await response from server
        await this.api.getWeatherData();

        //let response equal to this.api.response in order to shorten variable name
        let response = this.api.response;

        //Store the data in the proper places
        //date
        this.date=(new Date(response.dt*1000)).toUTCString();
        //humidity
        this.humidity=response.main.humidity;
        //forecast
        this.forecast.weather=response.weather[0].main;
        this.forecast.description=response.weather[0].description;
        //location
        this.location.coord.latitude=response.coord.lat;
        this.location.coord.longitude=response.coord.lon;
        this.location.country=response.sys.country;
        this.location.name=response.name;
        //temp
        this.temp.k=response.main.temp;
        this.temp.convertTempC();
        this.temp.convertTempF();
        this.temp.feelsLike=response.main.feels_like;
        this.temp.todaysHigh=response.main.temp_max;
        //windspeed
        this.windSpeed=response.wind.speed;
    };
};

export default Weather;