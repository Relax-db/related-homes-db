/* eslint-disable no-console */
require('newrelic');
const cluster = require('cluster');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const cpuCount = require('os').cpus().length;
const redis = require('redis');
const { renderToString } = require('react-dom/server');

const controller2 = require('./controller2.js');

const redisclient = redis.createClient();

const app = express();

app.use(compression());

const MASTERPORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/houses', express.static(path.join(__dirname, '../client/public')));


if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.id} died`);
    cluster.fork();
  });
} else {
  const getCache = (req, res) => {
    const { location } = req.params;
    redisclient.get(location, (err, result) => {
      if (result) {
        res.send(result);
      } else {
        controller2.get13RelatedHouses(req, res, (response) => {
          redisclient.setex(location, 3600, JSON.stringify(response));
        });
      }
    });
  };
  // get related homes
  // 13 because just in case this house shows up
  // goal is 12 houses
  app.get('/houses/location/:location', (req, res) => {
    getCache(req, res);
    // controller2.get13RelatedHouses(req, res);
  });

  app.get('/houses/:id', (req, res) => {
    // const appToString = renderToString(<App />);
    res.redirect(`/houses/?id=${req.params.id}`);
  });

  app.get('/houses/*', (req, res) => {
    res.redirect(req.url);
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


  app.listen(MASTERPORT, () => console.log(`listening on ${MASTERPORT}`));

  console.log('Worker %d running!', cluster.worker.id);
}
