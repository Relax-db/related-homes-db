/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable quotes */
/* eslint-disable no-console */
const cassandra = require('cassandra-driver'); // used to generate id
const { client } = require('../database/cassandraClient.js');

const getRelatedHouses = (req, res) => {
  const queryRelatedHouses = 'SELECT * FROM housekeyspace2.houses where location like ? limit 13';
  const queryGetHouse = 'SELECT * FROM housekeyspace2.houses where id = ?';
  client.execute(queryGetHouse, [req.params.houseId])
    .then((response) => response.rows[0].location.split('-')[0])
    .then((zipCode) => client.execute(queryRelatedHouses, [`${zipCode}`]))
    .then((relatedHomes) => res.send(relatedHomes.rows))
    .catch((e) => console.log(e));
};

const createHouse = (req, res) => {
  const queryCreateHouse = 'INSERT INTO houseKeySpace2.houses'
    + '(id, photo, location, beds, rating, description, price)'
    + 'values (?, ?, ?, ?, ?, ?, ?)';

  const {
    photo,
    location,
    beds,
    rating,
    description,
    price,
  } = req.body;

  const queryParameters = [
    cassandra.types.Uuid.random(),
    photo,
    location,
    beds,
    rating,
    description,
    price,
  ];

  client.execute(queryCreateHouse, queryParameters)
    .then(() => res.send(queryParameters[0]));
};

const updateHouse = (req, res) => {
  const queryUpdateHouse = 'UPDATE houseKeySpace2.houses ';
  const propertyChanges = () => {
    let outputString = 'SET ';
    for (const key in req.body) {
      outputString += `${key} = '${req.body[key]}', `;
    }
    // need to remove last comma
    const outputArr = outputString.split('');
    outputString = outputArr.slice(0, outputString.length - 2).join('');
    return outputString;
  };

  const indicateHouse = ` WHERE id = ${req.params.houseId}`;
  const combinedStrings = queryUpdateHouse + propertyChanges() + indicateHouse;

  client.execute(combinedStrings)
    .then(() => {
      res.send('house was updated');
    });
};

const removeHouse = (req, res) => {
  const queryDelete = `DELETE from houseKeySpace2.houses where id = ${req.params.houseId}`;
  client.execute(queryDelete)
    .then(() => {
      res.send('house was deleted');
    });
};

module.exports = {
  getRelatedHouses,
  createHouse,
  updateHouse,
  removeHouse,
};
