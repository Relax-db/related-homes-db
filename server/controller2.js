const models2 = require('./models2.js');

const get13RelatedHouses = (req, res) => {
  models2.getRelatedHouses(req, res);
};

const makeHouse = (req, res) => {
  models2.createHouse(req, res);
};

const updateHouseProperties = (req, res) => {
  models2.updateHouse(req, res);
};

const deleteHouse = (req, res) => {
  models2.removeHouse(req, res);
};

module.exports = {
  get13RelatedHouses,
  makeHouse,
  updateHouseProperties,
  deleteHouse,
};
