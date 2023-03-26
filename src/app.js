const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require("./utils/forecast");
const geo_location = require("./utils/geocode");
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();

const publicRessourcesPath = path.join(__dirname, '..', 'public');
const pathToViews = path.join(__dirname, '..', 'templates', 'views');
const pathToPartials = path.join(__dirname, '..', 'templates', 'partials');

app.set('views', pathToViews);
app.set('view engine', 'hbs');

hbs.registerPartials(pathToPartials);

app.use(express.static(publicRessourcesPath));
app.use(express.urlencoded( {extended: true }))
app.use(express.json())

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
            res.send(JSON.stringify(weatherData));
          })
        }
        return res.send({
            error: `${error}`
        })

    })
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

app.get('/login(.html)?', (req, res) => {
    res.render('login');
});

app.get('*', (req, res) => {
    console.log(req.url);
    
    let msg = req.url.length > 15 ? "you typed and" : req.url;  

    res.render('404', {
        pageMsg: `${msg}`
    });
});

app.post('/comment', (req, res)=>{
    console.log(req.body);
    
    return res.send({msg: 'Hey'})
    // const data = JSON.parse(req.body);
    // const formating = `This is a comment from ${data.email} and it says: ${data.textComment}.\n`;

    // fs.appendFile(path.join(__dirname, '..', 'comments.txt'), formating, (err)=>{
    //     if(err) throw err;
    //     return res.send('The user\'s comment has been saved.')
    // })
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});