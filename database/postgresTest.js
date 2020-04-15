/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const randomZip = require('random-zipcode');
const postgresClient = require('./postgresClient.js');
const helper = require('./schemaHelpers.js');

let start;

const BATCH = 10000000;

const writeUsers = fs.createWriteStream(path.join(__dirname, 'data.csv'));
writeUsers.write('photo,location,beds,rating,description,price\n', 'utf8');

const writeTenMillionUsers = (writer, encoding, callback) => {
  start = new Date();
  let i = BATCH;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const photo = `${helper.imageLoader()}`;
      const location = randomZip();
      const beds = `${helper.makeBedsAndHouseString()}`;
      const rating = `${helper.getRandomArbitrary(3, 5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`;
      const description = `${helper.makeDescription()}`;
      const price = `$${faker.commerce.price()}`;
      const data = `${photo},${location},${beds},${rating},${description},${price}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
      if ((i % 100000) === 0) {
        console.log('draining houses, here is what is left to make', (i / BATCH) * 100, '%');
      }
    }
  };
  write();
};

const housesdb = 'CREATE UNLOGGED TABLE if not exists houses'
  + '(id serial, photo varchar(300), location int, beds varchar(300), rating varchar(100), description varchar(1000), price varchar(100), PRIMARY KEY(id))';

const createIndex = 'CREATE INDEX if not exists location ON houses(location)';

const queryCopyTable = `COPY houses ( photo, location, beds, rating, description, price ) from '${path.join(__dirname, 'data.csv')}' DELIMITER ',' CSV HEADER`;

const populateDatabase = () => {
  postgresClient.connect()
    .then(() => console.log('connected to houses_database'))
    .then(() => postgresClient.query(housesdb))
    .then(() => postgresClient.query(createIndex))
    .then(() => {
      postgresClient.query(queryCopyTable, () => {
        console.log('check table');
        console.log(`Total time elapsed ${(new Date() - start) / 1000} seconds`);
        fs.unlinkSync(path.join(__dirname, 'data.csv'));
      });
    });
};


writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end(populateDatabase);
});
