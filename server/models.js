const mongoose = require('mongoose')

let mongoHost = process.env.MONGOHOST || 'localhost'

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  socketTimeoutMS: 1000,
  authSource: 'admin'
}
mongoose.connect(`mongodb://${mongoHost}/RelaxlyRelatedHouses`, options);

var schema = new mongoose.Schema({
  houseId: {type: 'number', unique: true},
  photoSrc: 'string',
  bedsAndHouse: 'string',
  rating: 'string',
  description: 'string',
  pricePerNight: 'string',
  relatedHouses: ['number']
});

var House = mongoose.model('House', schema);


let query = (houseId, callback) => {
  let getHouses = House.find({ houseId }, null, (err, house) => {
    let returnId = house[0].houseId
    House.find ({houseId: {$in: house[0].relatedHouses}}, (err, houses) => {
      callback(houses)
    })
  });
}


module.exports = { query };
