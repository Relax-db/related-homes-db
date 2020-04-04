/* eslint-disable import/order */
/* eslint-disable no-console */
const express = require('express');
const controller = require('./controller.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 1028;
const path = require('path');

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client', 'public')));

app.get('/:houseId(\\d+)', (req, res) => {
  res.redirect(`/?houseId=${req.params.houseId}`);
});

app.get('/houses/*', (req, res) => {
  console.log(req.url);
  let oneHouse = {};
  const callback = (relatedHouses) => {
    oneHouse = JSON.stringify(relatedHouses);
    res.send(oneHouse);
  };
  controller.get(req.query.houseId, callback);
});

// gets related homes at house at id, if no home is specified return relatedHomes to house at id 1
// app.use(bodyParser.urlencoded({ extended: false }));
// app.get('/relatedHomes/:houseId/', (req, res) => {
//   console.log('the house params', req.params);
//   console.log('the query', req.query);
//   const query = (JSON.stringify(req.query) !== '{}') ? req.query : { houseId: 1 };
//   const callback = (relatedHouses) => {
//     res.send(relatedHouses);
//   };
//   controller.get(query.houseId, callback);
// });

// // makes new house
// app.post('/houses/create/', (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });


// app.put('/houses/:id/relatedHouses/:action/house=:relatedHomeId', (req, res) => {
//   res.send(req.params);
// });

app.listen(port, () => console.log(`Related Houses Listening ${port}`));