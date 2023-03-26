const request = require('request');

const forecast = (latitude, longitude, callback) => {

  const urlWeatherAPI = `http://api.weatherstack.com/current?access_key=0441e0e741a5d6c01d906f94f159de56&query=${latitude},${longitude.toString()}&units=m`;

  request({ url: urlWeatherAPI, json: true }, (error, response) => {
    const weatherInfos = {
      description: 'unknown',
      temperature: 'unknown',
      feelslike: 'unknown',
      windspeed: 'unknown',
      visibility: 'unknown',
      humidity: 'unknown'     
    }
    
    if (error) {
      console.log("There was an issue. Check your internet connection.");
    }
    else if (response.body.error) {
      console.log("There was an error connecting to the API. Try again later.");
    }
    else {
      const currentDataInfo = response.body.current;
      console.log(currentDataInfo);
      
      const [weatherDescribe] = currentDataInfo.weather_descriptions,
            temperature = currentDataInfo.temperature,
            feelslike = currentDataInfo.feelslike,
            windspeed = currentDataInfo.wind_speed,
            visibility = currentDataInfo.visibility,
            humidity = currentDataInfo.humidity
            
      weatherInfos.description = weatherDescribe;
      weatherInfos.temperature = temperature;
      weatherInfos.feelslike = feelslike;
      weatherInfos.windspeed = windspeed;
      weatherInfos.visibility = visibility;
      weatherInfos.humidity = humidity;
          
    }
    callback(weatherInfos);
  });
}

module.exports = {
  forecast: forecast
}