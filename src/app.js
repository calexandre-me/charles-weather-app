const express = require('express');

const PORT = 3000;

const app = express();

app.get('', (req, res) => {
    res.send('<h1>OK</h1>');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});