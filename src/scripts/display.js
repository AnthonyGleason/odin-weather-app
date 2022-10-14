import rainImg from "../assets/rain.jpg";
import cloudsImg from "../assets/clouds.jpg";
import sunnyImg from "../assets/sunny.jpg";
import hazeImg from "../assets/haze.jpg";

let Display = function(){
    this.searchButton = document.querySelector('.search-button');
    this.toggleTempButton = document.querySelector('.toggle-temp-button');
    this.tempUnitType = "F";
    this.weatherData = document.querySelector('.weather-data');
    this.weatherImg = document.querySelector('.weather-img');

    Display.prototype.addButtonListeners = function (WEATHERCONTROLLER){
        this.searchButton.addEventListener('click', async()=>{
            //set city according to search input
            WEATHERCONTROLLER.api.searchInput=weatherSearch.value;
        
            //get current weather data for city
            await WEATHERCONTROLLER.populateWeatherData(weatherSearch);
        
            //display retrieved data
            this.displayWeatherData(WEATHERCONTROLLER);

        });

    };

    Display.prototype.displayWeatherData = function (weather){
        //clear the weather data div
        this.weatherData.innerHTML=null;

        //create the date element
        let date = document.createElement('div');
        date.setAttribute('class', 'date');
        date.textContent=weather.date;

        //create the humidity element
        let humidity = document.createElement('div');
        humidity.setAttribute('class', 'humidity');
        humidity.textContent="Humidity: "+weather.humidity;

        //create the forecast element
        let forecast = document.createElement('div');
        forecast.setAttribute('class', 'forecast');
            //create the weather div
            let weatherDiv = document.createElement('div');
            weatherDiv.setAttribute('class', 'weather-div');
            weatherDiv.textContent="Weather: "+weather.forecast.weather;
            //create the description div
            let description = document.createElement('div');
            description.setAttribute('class', 'description');
            description.textContent="Weather Description: "+weather.forecast.description;
            
            //append the forecast elements
            forecast.appendChild(weatherDiv);
            forecast.appendChild(description);

        //create the location element
        let location = document.createElement('div');
        location.setAttribute('class', 'location');
            //create the coord div
            let coord = document.createElement('div');
            coord.setAttribute('class', 'coord');
                //create the latitude div
                let latitude = document.createElement('div');
                latitude.setAttribute('class', 'latitude');
                latitude.textContent="Latitude: "+weather.location.coord.latitude+"°";
                //create the longitude div
                let longitude = document.createElement('div');
                longitude.setAttribute('class', 'longitude');
                longitude.textContent="Longitude: "+weather.location.coord.longitude+"°";
                //append the coord elements
                coord.appendChild(latitude);
                coord.appendChild(longitude);
            //create the country div
            let country = document.createElement('div');
            country.setAttribute('class', 'country');
            country.textContent="Country: "+weather.location.country;
            //create the name div
            let name = document.createElement('div');
            name.setAttribute('class', 'name');
            name.textContent="City: "+weather.location.name;
            //append location elements
            location.appendChild(coord);
            location.appendChild(country);
            location.appendChild(name);
        //create the temp element
        let temp = document.createElement('div');
        temp.setAttribute('class', 'temp');
            //create the temp div depending on the units selected
            let tempUnit = document.createElement('div');
            tempUnit.setAttribute('class', 'tempUnit');
            //set the temperature to f or c
            this.tempUnitType==='F' ? tempUnit.textContent="Current Temperature: "+ weather.temp.f+"°F" : tempUnit.textContent="Current Temperature: "+ weather.temp.c+"°C";
            //create the today's high temp div
            let todaysHigh = document.createElement('div');
            todaysHigh.setAttribute('class', 'todays-high');
            //set the temperature to f or c
            this.tempUnitType==='F' ? todaysHigh.textContent="Today's High: "+ weather.temp.todaysHighF+"°F" : todaysHigh.textContent="Today's High: "+ weather.temp.todaysHighC+"°C";
            //create the feels like temp div
            let feelsLike = document.createElement('div');
            feelsLike.setAttribute('class', 'feels like');
            //set the temperature to f or c
            this.tempUnitType==='F' ? feelsLike.textContent="Feels Like: "+ weather.temp.feelsLikeF+"°F" : feelsLike.textContent="Feels Like: "+ weather.temp.feelsLikeC+"°C";
            //create the toggle temp button
            let toggleTempButton = document.createElement('button');
            toggleTempButton.setAttribute('class', 'toggle-temp-button');
            toggleTempButton.setAttribute('type', 'button');
            toggleTempButton.textContent='Toggle temperature units';
            toggleTempButton.addEventListener('click', ()=>{
                //switch units
                this.toggleTempUnits();
                //display new data
                this.displayWeatherData(weather);
            });
            //append the temp elements
            temp.appendChild(tempUnit);
            temp.appendChild(todaysHigh);
            temp.appendChild(feelsLike);
            temp.appendChild(toggleTempButton);
        //create the wind speed element
        let windSpeed=document.createElement('div');
        windSpeed.setAttribute('class', 'wind-speed');

        //append elements to weather data div
        this.weatherData.appendChild(date);
        this.weatherData.appendChild(humidity);
        this.weatherData.appendChild(forecast);
        this.weatherData.appendChild(location);
        this.weatherData.appendChild(temp);
        this.weatherData.appendChild(windSpeed);

        //set background according to weather
        switch (weather.forecast.weather){
            case 'Clouds':
                this.weatherImg.setAttribute('src', cloudsImg);    
                break;
            case 'Sunny':
                this.weatherImg.setAttribute('src', sunnyImg);
                break;
            case 'Rain':
                this.weatherImg.setAttribute('src', rainImg);
                break;
            case 'Haze':
                this.weatherImg.setAttribute('src', hazeImg);
                break;
        };
    };

    //toggles temperature units between F and C
    Display.prototype.toggleTempUnits = function (){
        this.tempUnitType==="F" ? this.tempUnitType="C" : this.tempUnitType="F";
    };
};

export default Display;