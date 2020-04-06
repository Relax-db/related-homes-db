/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
/* eslint-disable no-console */
const cassandra = require('cassandra-driver');
const faker = require('faker');
const shelljs = require('shelljs');
const client = require('./cassandraClient.js');
const helper = require('./schemaHelpers.js');

const maxHomes = 10000000;

let start;

let count = 0;

const createKeySpace = "CREATE KEYSPACE if not exists houseKeySpace2 WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 }";

const houses = "CREATE TABLE if not exists houseKeySpace2.houses"
+ "(id uuid, photo text, location text, beds text, rating text, description text, price text, PRIMARY KEY(id))";

const newHouse = "INSERT INTO houseKeySpace2.houses"
+ "(id, photo, location, beds, rating, description, price)"
+ "values (?, ?, ?, ?, ?, ?, ?)";

const customIndex = "CREATE CUSTOM INDEX if not exists house_location ON houseKeySpace2.houses (location) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS = {'mode': 'CONTAINS', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.StandardAnalyzer', 'case_sensitive': 'false'}";

// const numberOfHouses = "SELECT COUNT(*) FROM housekeyspace.houses";

const houseMaker = (callback) => {
  const params = [
    cassandra.types.Uuid.random(),
    helper.imageLoader(),
    faker.address.zipCode(),
    helper.makeBedsAndHouseString(),
    `${helper.getRandomArbitrary(3, 5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`,
    `${helper.makeDescription()}`,
    `$${faker.commerce.price()}`,
  ];
  return client.execute(newHouse, params, callback);
};

// < ----------- Do not change this part ------------>
const makeMoreHomes = (callback) => {
  for (let i = 0; i < 20000; i += 1) { // can change end value, however do not recommend over 80000
    count += 1;
    if (i + 1 === 20000 && count < maxHomes) {
      console.log('Made ', count, ' homes');
      houseMaker(() => makeMoreHomes(callback));
    } else {
      houseMaker();
      if (count === maxHomes) {
        console.log('Finished Making', count, 'homes');
        callback();
      }
    }
  }
};

client.connect()
  .then(console.log('one connection'))
  .then(() => client.execute(createKeySpace)) // making a keyspace
  .then(() => client.execute(houses))
  .then(() => client.execute(customIndex))
  .then(start = new Date())
  .then(() => console.log('Populating houses table'))
  .then(() => makeMoreHomes(() => {
    console.log('Time used to finish making', count, 'homes', (new Date() - start) / 1000, 'seconds')
    shelljs.exit();
  }));

// < ----------- Do not change this part ------------>
// for related houses SELECT * FROM housekeyspace2.houses where location like '%9407' limit 10;
