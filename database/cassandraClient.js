/* eslint-disable prefer-destructuring */
const cassandra = require('cassandra-driver');

const distance = cassandra.types.distance;

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 3,
      [distance.remote]: 1,
    },
    maxRequestsPerConnection: 32768,
  },
});

module.exports = client;
