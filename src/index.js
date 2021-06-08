// index.js
// This is the main entry point of our application
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('react native'));

app.listen(4000, () => console.log('listening on port 4000'));