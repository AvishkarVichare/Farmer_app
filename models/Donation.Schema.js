const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount:{
    type:Number,
    required:true
  },
  intrest:{
    type:Number,
    required:true
  },
  accepted:{
    type:Boolean,
    default:false
  }
});


const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;