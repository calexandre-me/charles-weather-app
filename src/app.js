const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require("./utils/forecast");
const geo_location = require("./utils/geocode");

const PORT = 3000;

const app = express();

const publicRessourcesPath = path.join(__dirname, '..', 'public');
const pathToViews = path.join(__dirname, '..', 'templates', 'views');
const pathToPartials = path.join(__dirname, '..', 'templates', 'partials');

app.set('views', pathToViews);
app.set('view engine', 'hbs');

hbs.registerPartials(pathToPartials);

app.use(express.static(publicRessourcesPath));

app.get('', (req, res) => {
    res.render('index');
});

app.get('/secure-1234-weather-info-api-get-info', (req, res) => {
    const userQuery = req.query;
    console.log(userQuery);
    
    if(Object.keys(userQuery).length == 0){
        return res.send({
                error: "No query were provided"
        })
    }
    else{
        if(!userQuery.address){
            return res.send({
                error: "The key <ADDRESS> is required to process the command."
            })
        }
    }
    //Add a default location for the user
    geo_location.geocode(userQuery.address, (error, {latitude, longitude} = {})=>{
        if(!error){
          return weather.forecast(latitude, longitude, (weatherData)=>{
            res.send(weatherData);
          })
        }
        return res.send({
            error: `${error}`
        })

    })
    // geo_location.geocode(userQuery.address, (error, {latitude, longitude} = {})=>{
    //     if(error){
    //         return res.send({
    //             error: `${error}`
    //         })
    //     }
    //     else{
    //         weather.forecast(latitude, longitude, (error, weatherData)=>{
    //             if(!error){
    //                 res.send(weatherData);
    //             }
    //             else{
    //                res.send({
    //                     error: `${error}`
    //                 })
    //             }
    //         })
    //     }
    // })
});
//========================
app.get('/forecast(.html)?', (req, res) => {
    res.render('forecast');
});

app.get('/location(.html)?', (req, res) => {
    res.render('location');
});

app.get('/about(.html)?', (req, res) => {
    res.render('about');
});

app.get('/help(.html)?', (req, res) => {
    res.render('help');
});

app.get('*', (req, res) => {
    res.render('404', {
        pageName: `${req.url}`
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});