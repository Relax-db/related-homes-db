/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const controller2 = require('./controller2.js');


const app = express();

const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client', 'public')));

// get related homes
// 13 because just in case this house shows up
// goal is 12 houses
app.get('/houses/:houseId/relatedHomes/', (req, res) => {
  controller2.get13RelatedHouses(req, res);
});

// make house
app.post('/houses/', (req, res) => {
  controller2.makeHouse(req, res);
});

// update house
app.put('/houses/:houseId/', (req, res) => {
  controller2.updateHouseProperties(req, res);
});

// delete house
app.delete('/houses/:houseId/', (req, res) => {
  controller2.deleteHouse(req, res);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
