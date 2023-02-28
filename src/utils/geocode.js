const request = require('request');

const geocode = function (address, callback){
  const url = `https://api.geoapify.com/v1/geocode/search?text=${address}&lang=en&limit=1&type=city&format=json&apiKey=ecc7d1ab41b44aab8e405708c2e75ba8`;

request({url: url, json:true}, (error, response)=>{
  if(error){
    callback('Unable to connect to the Location Server! Please check your internet connection!', undefined);
  }
  else if(response.body.results.length == 0){
    callback('The location you gave is incorrect.', undefined)
  }
  else{
    const longitude = response.body.results[0].lon;
    const latitude = response.body.results[0].lat;

    callback(undefined, {
      latitude: latitude,
      longitude: longitude
    });
  }
});
  
}


module.exports = {
  geocode: geocode
}