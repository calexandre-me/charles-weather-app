const path = require('path');
const express = require('express');
const hbs = require('hbs');

const PORT = 3000;

const app = express();

const publicRessourcesPath = path.join(__dirname, '..', 'public');
const pathToViews = path.join(__dirname, '..', 'templates', 'views');

app.set('views', pathToViews);

app.use(express.static(publicRessourcesPath));
app.set('view engine', 'hbs');

app.get('', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});