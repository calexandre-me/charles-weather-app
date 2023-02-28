const request = require('request');

const forecast = (latitude, longitude, callback) => {

  const urlWeatherAPI = `http://api.weatherstack.com/current?access_key=0441e0e741a5d6c01d906f94f159de56&query=${latitude},${longitude.toString()}&units=m`;

  request({ url: urlWeatherAPI, json: true }, (error, response) => {
    const weatherInfos = {
      description: 'unknown',
      temperature: 'unknown',
      windspeed: 'unknown',
      humidity: 'unknown',
      visibility: 'unknown',
      feelslike: 'unknown'
    }
    if (error) {
      console.log("There was an issue. Check your internet connection.");
    }
    else if (response.body.error) {
      console.log("There was an error connecting to the API. Try again later.");
    }
    else {
      const currentDataInfo = response.body.current;

      const [weatherDescribe] = currentDataInfo.weather_descriptions,
            temperature = currentDataInfo.temperature,
            windspeed = currentDataInfo.windspeed,
            humidity = currentDataInfo.humidity,
            visibility = currentDataInfo.visibility,
            feelslike = currentDataInfo.feelslike;

      weatherInfos.description = weatherDescribe;
      weatherInfos.temperature = temperature;
      weatherInfos.windspeed = windspeed;
      weatherInfos.humidity = humidity;
      weatherInfos.visibility = visibility;
      weatherInfos.feelslike = feelslike;
    }

    //currentDataInfo.feelslike

    callback(weatherInfos);

  });

}

module.exports = {
  forecast: forecast
}