const path = require('path');
const express = require('express');
const hbs = require('hbs');

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