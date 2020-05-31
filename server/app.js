'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let cars = []

app.get('/cars', function(req, res) {
  res.json(cars);
});

app.post('/cars', function(req, res) {
  const img = req.body.img
  const brand = req.body.brand
  const year = req.body.year
  const licensePlate = req.body.licenseplate
  const color = req.body.color

  cars.push({
    img: img, 
    brand: brand,
    year: year,
    licensePlate: licensePlate,
    color: color 
  })

  res.json(cars[cars.length - 1].brand)
})

app.use('/car', routes);

app.listen(port, function() {
  console.log('Listening on port http://localhost:%d', port);
});
