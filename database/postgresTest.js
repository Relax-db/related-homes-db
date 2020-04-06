/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const postgresClient = require('./postgresClient.js');
const helper = require('./schemaHelpers.js');

const writer = csvWriter();

let start;

const dataGen = (callback) => {
  start = new Date();
  writer.pipe(fs.createWriteStream(path.join(__dirname, 'data.csv')));
  for (let i = 0; i < 10000000; i += 1) {
    writer.write({
      photo: `${helper.imageLoader()}`,
      location: `${faker.address.zipCode()}`,
      beds: `${helper.makeBedsAndHouseString()}`,
      rating: `${helper.getRandomArbitrary(3, 5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`,
      description: `${helper.makeDescription()}`,
      price: `$${faker.commerce.price()}`,
    });
  }

  writer.end(() => {
    console.log('done making data');
    callback();
  });

};

const housesdb = 'CREATE UNLOGGED TABLE if not exists houses'
  + '(id serial, photo varchar(300), location varchar(300), beds varchar(300), rating varchar(300), description varchar(1000), price varchar(300), PRIMARY KEY(id))';


const queryCopyTable = `COPY houses ( photo, location, beds, rating, description, price ) from '${path.join(__dirname, 'data.csv')}' DELIMITER ',' CSV HEADER`;

const populateDatabase = () => {
  postgresClient.connect()
    .then(() => console.log('connected to houses_database'))
    .then(() => postgresClient.query(housesdb))
    .then(() => {
      postgresClient.query(queryCopyTable, () => {
        console.log('check table');
        console.log(`Total time elapsed ${(new Date() - start) / 1000} seconds`);
        fs.unlinkSync(path.join(__dirname, 'data.csv'));
      });
    });
};

dataGen(populateDatabase);
