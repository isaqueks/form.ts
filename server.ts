import express = require('express');
import fs = require('fs');
import path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')))

app.listen(3500, () => {
    console.log(`Server listenning at http://localhost:3500`);
})