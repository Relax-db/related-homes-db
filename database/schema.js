const mongoose = require('mongoose')
const faker = require('faker')
const util = require('util')
const helper = require('./schemaHelpers.js');

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  connectTimeoutMS: 1000,
  user: 'craiglion',
  pass: 'foobarbaz'
}
mongoose.connect('mongodb://3.101.35.18/RelaxlyRelatedHouses?authSource=admin', options );

const schema = new mongoose.Schema({
  houseId: {type: 'number', unique: true},
  photoSrc: 'string',
  bedsAndHouse: 'string',
  rating: 'string',
  description: 'string',
  pricePerNight: 'string',
  relatedHouses: ['number']
});


const House = mongoose.model('House', schema);


let houseItemMaker = (numberOfHouses) => {
  let array = [];
  for (var i = 1; i <= numberOfHouses; i++) {
    let houseObj = {
      houseId: i,
      photoSrc:helper.imageLoader(),
      bedsAndHouse: helper.makeBedsAndHouseString(),
      rating: `${helper.getRandomArbitrary(3,5).toFixed(2)} (${helper.getRandomInt(10, 10000)})`,
      description: `${helper.makeDescription()}`,
      pricePerNight: `$${faker.commerce.price()}`,
      relatedHouses: helper.makeRelatedHousesArray(1,numberOfHouses, i, 12)
    }
    array.push(houseObj);
  }
  return array;
  }

  let dbSeeder = (numberOfEntries) => {
    const allHousesArray = houseItemMaker(numberOfEntries)
    House.insertMany(allHousesArray, function (err) {
      if (err) {throw (err);}
      mongoose.connection.close()
    });
  }

dbSeeder(100)

