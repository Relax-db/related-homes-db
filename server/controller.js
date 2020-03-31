const express = require('express');
const controller = express.Router();
const models = require ('./models.js');


let get = (houseId, callback) => {

  models.query(houseId, callback)
};

module.exports = { get };
