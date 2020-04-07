/* eslint-disable no-console */
const axios = require('axios');

const sampleHouseBody = {
  photo: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  location: '94070',
  beds: '3 beds 2 bath',
  rating: '2.78 (1000)',
  description: 'cool house',
  price: '299',
};

const sampleUpdateBody = {
  beds: '4 beds 0 baths',
  price: '1000',
};

let sampleId;

let start = new Date();
const startCopy = start;

// axios.post('http://localhost:3001/houses/', sampleHouseBody)
//   .then((response) => {
//     console.log('Added house in', new Date() - start, 'ms');
//     console.log('Made one house with id:', response.data);
//     sampleId = response.data;
//     return response.data;
//   })
//   .then((houseId) => {
//     start = new Date();
//     return axios.get(`http://localhost:3001/houses/${houseId}/relatedHomes`);
//   })
//   .then((response) => {
//     console.log('GET Related Homes in', new Date() - start, 'ms');
//     console.log('Related homes', response.data);
//   })
//   .then(() => {
//     start = new Date();
//     return axios.put(`http://localhost:3001/houses/${sampleId}/`, sampleUpdateBody);
//   })
//   .then((response) => {
//     console.log(response.data, 'in', new Date() - start, 'ms');
//   })
//   .then(() => {
//     start = new Date();
//     return axios.delete(`http://localhost:3001/houses/${sampleId}/`);
//   })
//   .then((response) => {
//     console.log(response.data, 'in', new Date() - start, 'ms');
//     console.log('go check for house at id:', sampleId);
//     console.log('Total elapsed time for 4 chained CRUD operations', new Date() - startCopy, 'ms');
//   });
const start1 = new Date();
let count = 0;

const getHouse = () => {
  count += 1;
  if ((new Date() - start1) > 1000) {
    console.log(`done made ${count} requests in 1 second`);
  } else {
    axios.get('http://localhost:3001/houses/c840eb78-1cec-42dd-99a7-efe88b84ef15/relatedHomes')
      .then(() => getHouse());
  }
};

getHouse();
