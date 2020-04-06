/* eslint-disable no-console */
const { Client } = require('pg');

const postgresClient = new Client({
  host: 'localhost',
  user: 'housesdb',
  password: 'password',
  database: 'houses_database',
  port: '5432',
});

module.exports = postgresClient;
