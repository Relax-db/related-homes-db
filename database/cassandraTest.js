/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
/* eslint-disable no-console */
const cassandra = require('cassandra-driver');
const faker = require('faker');
const shelljs = require('shelljs');
const {
  client,
  client2,
} = require('./cassandraClient.js');
const helper = require('./schemaHelpers.js');

const MAX_HOMES = 1000000;

const BATCH_SIZE = 1000;

let start;
// let start2;

let count = 0;

let made = 0;

const createKeySpace = "CREATE KEYSPACE if not exists houseKeySpace2 WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 }";

const houses = "CREATE TABLE if not exists houseKeySpace2.houses"
+ "(id uuid, photo text, location text, beds text, rating text, description text, price text, PRIMARY KEY(id))";

const newHouse = "INSERT INTO houseKeySpace2.houses"
+ "(id, photo, location, beds, rating, description, price)"
+ "values (?, ?, ?, ?, ?, ?, ?)";

const customIndex = "CREATE CUSTOM INDEX if not exists house_location ON houseKeySpace2.houses (location) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS = {'mode': 'CONTAINS', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.StandardAnalyzer', 'case_sensitive': 'false'}";
let makeMoreHomes;

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
  return client.execute(newHouse, params).then(callback).catch(() => {
    console.log('error making house try again!');
    makeMoreHomes(() => {});
  });
};
// < ----------- Do not change this part ------------>
makeMoreHomes = (callback) => {
  const batchStart = new Date();
  for (let i = 0; i < BATCH_SIZE; i += 1) { // can change end value,
    // however do not recommend over 80000
    count += 1;
    if (i + 1 === BATCH_SIZE && count < MAX_HOMES) {
      // eslint-disable-next-line no-loop-func
      console.log('Generated ', BATCH_SIZE);
      // eslint-disable-next-line no-loop-func
      houseMaker(() => {
        console.log('time', (new Date() - batchStart) / 1000, 'seconds');
        console.log('Inserted ', BATCH_SIZE, ' homes');
        console.log('Number of homes made', made, 'of requested', count, '===>', (made / count) * 100, '%');
        makeMoreHomes(callback);
      });
    } else {
      // eslint-disable-next-line no-loop-func
      houseMaker(() => { made += 1; });
      if (count === MAX_HOMES) {
        console.log('Finished Making', count, 'homes');
        callback();
      }
    }
  }
};

client.connect()
  .then(console.log('first connection'))
  .then(() => client.execute(createKeySpace)) // making a keyspace
  .then(() => client.execute(houses))
  .then(() => client.execute(customIndex))
  .then(start = new Date())
  .then(() => console.log('Populating houses table'))
  .then(() => makeMoreHomes(() => {
    console.log('Time used to finish making', count, 'homes', (new Date() - start) / 1000, 'seconds');
    shelljs.exit();
  }))
  .catch((e) => console.log('identify this error', e));

// client2.connect()
//   .then(console.log('second connection'))
//   .then(() => client.execute(createKeySpace)) // making a keyspace
//   .then(() => client.execute(houses))
//   .then(() => client.execute(customIndex))
//   .then(start2 = new Date())
//   .then(() => console.log('Populating houses table'))
//   .then(() => makeMoreHomes2(() => {
//     console.log('Time used to finish making', count, 'homes', (new Date() - start2) / 1000, 'seconds .................. from client 2');
//     shelljs.exit();
//   }))
//   .catch((e) => console.log('identify this error', e));

// < ----------- Do not change this part ------------>
