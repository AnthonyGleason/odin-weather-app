let Api = function (){
    this.response = undefined;
    //The search input goes in the middle of the two array elements
    this.request = ["api.openweathermap.org/data/2.5/weather?q=","&APPID=340442d64a4bbc16adbbe8497363d2fa"];
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
    this.todaysHighF = undefined;
    this.todaysHighC = undefined;
    this.feelsLikeF = undefined;
    this.feelsLikeC = undefined;

    //converts temperature from kelvin to C
    Temp.prototype.convertTempC = function (tempKelvin){
        return tempKelvin-273.15;
    };

    //converts temperature from kelvin to F
    Temp.prototype.convertTempF = function (tempKelvin){
        return (tempKelvin - 273.15) * (9/5) + 32;
    };
    Temp.prototype.trimTemps = function (){
        this.c=(this.c.split("."))[0];
        this.f=(this.f.split("."))[0];
        this.todaysHighC=(this.todaysHighC.split("."))[0];
        this.todaysHighF=(this.todaysHighF.split("."))[0];
        this.feelsLikeC=(this.feelsLikeC.split("."))[0];
        this.feelsLikeF=(this.feelsLikeF.split("."))[0];
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
        this.temp.c=String(this.temp.convertTempC(this.temp.k));
        this.temp.f=String(this.temp.convertTempF(this.temp.k));
        this.temp.feelsLikeC=String(this.temp.convertTempC(response.main.feels_like));
        this.temp.feelsLikeF=String(this.temp.convertTempF(response.main.feels_like));
        this.temp.todaysHighC=String(this.temp.convertTempC(response.main.temp_max));
        this.temp.todaysHighF=String(this.temp.convertTempF((response.main.temp_max)));
        //trim the temperatures to the left of the decimal place
        this.temp.trimTemps();
        //windspeed
        this.windSpeed=response.wind.speed;
    };
};

export default Weather;