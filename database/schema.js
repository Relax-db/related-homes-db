// const mongoose = require('mongoose')
// const faker = require('faker')
// const util = require('util')
// const helper = require('./schemaHelpers.js');

// let options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   connectTimeoutMS: 1000,
//   user: 'craiglion',
//   pass: 'foobarbaz'
// }

// // mongoose.connect('mongodb://3.101.35.18/RelaxlyRelatedHouses?authSource=admin', options );

// mongoose.connect('mongodb://localhost/RelaxlyRelatedHouses');

// const schema = new mongoose.Schema({
//   houseId: { type: 'number', unique: true },
//   photoSrc: 'string',
//   bedsAndHouse: 'string',
//   rating: 'string',
//   description: 'string',
//   pricePerNight: 'string',
//   relatedHouses: ['number'],
// });


// const House = mongoose.model('House', schema);


// let houseItemMaker = (numberOfHouses) => {
//   let array = [];
//   for (var i = 1; i <= numberOfHouses; i++) {
//     let houseObj = {
//       houseId: i,
//       photoSrc: helper.imageLoader(),
//       bedsAndHouse: helper.makeBedsAndHouseString(),
//       rating: `${helper.getRandomArbitrary(3,5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`,
//       description: `${helper.makeDescription()}`,
//       pricePerNight: `$${faker.commerce.price()}`,
//       relatedHouses: helper.makeRelatedHousesArray(1,numberOfHouses, i, 12)
//     }
//     array.push(houseObj);
//   }
//   return array;
// }

// let dbSeeder = (numberOfEntries) => {
//   console.log('number of entries', numberOfEntries)
//   const allHousesArray = houseItemMaker(numberOfEntries)
//   console.log(allHousesArray);
//   House.insertMany(allHousesArray, function (err) {
//     if (err) {console.log(err);}
//     mongoose.connection.close()
//   });
// }

// dbSeeder(100)
const faker = require('faker');

const arr = [];

const start = new Date();

for (let i = 0; i < 10000000; i += 1) {
  arr.push(faker.address.zipCode());
}

const time = new Date() - start;

console.log('the array', arr.sort(), '\n time', time, 'ms');