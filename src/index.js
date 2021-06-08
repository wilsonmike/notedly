// index.js
// This is the main entry point of our application
const express = require('express');
const port = process.env.PORT || 4000;
const app = express();

app.get('/', (req, res) => res.send('react native 1'));

app.listen(port, () => (
    console.log(`Server running at http://localhost:${port}`)
));