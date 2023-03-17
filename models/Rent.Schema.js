const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  toolname: {
    type: String,
    required: true
  },
  ownername: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Rent', rentSchema);