/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
/* eslint-disable no-console */
const cassandra = require('cassandra-driver');
const faker = require('faker');
const helper = require('./schemaHelpers.js');

const distance = cassandra.types.distance;

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 10,
      [distance.remote]: 1,
    },
    maxRequestsPerConnection: 32768,
  },
});

const createKeySpace = "CREATE KEYSPACE if not exists houseKeySpace WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 }";

const houses = "CREATE TABLE if not exists houseKeySpace.houses"
+ "(id uuid, photo text, location text, beds text, rating text, description text, price text, PRIMARY KEY(id))";

const newHouse = "INSERT INTO houseKeySpace.houses"
+ "(id, photo, location, beds, rating, description, price)"
+ "values (?, ?, ?, ?, ?, ?, ?)";

const houseMaker = () => {
  const params = [
    cassandra.types.Uuid.random(),
    helper.imageLoader(),
    faker.address.zipCode(),
    helper.makeBedsAndHouseString(),
    `${helper.getRandomArbitrary(3, 5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`,
    `${helper.makeDescription()}`,
    `$${faker.commerce.price()}`,
  ];
  return client.execute(newHouse, params);
};

client.connect()
  .then(console.log('one connection'))
  .then(() => client.execute(createKeySpace)) // making a keyspace
  .then(console.log('keyspace has been created'))
  .then(() => client.execute(houses))
  .then(console.log('Table for houses has been made'))
  .then(() => {
    for (let i = 0; i < 100000; i += 1) {
      if ((i + 1) % 10000 === 0) {
        console.log('generating house', i + 1);
      }
      houseMaker();
    }
  })
  .then(console.log('houses have been made'))
  .catch((err) => console.log(err));
