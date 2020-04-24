const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartdata = new Schema({
  id: { type: String },
  username: { type: String, require: true },
  city: { type: String },
  country: { type: String },
  lon: { type: String },
  lat: { type: String },
});


module.exports = mongoose.model('cartdata', cartdata);