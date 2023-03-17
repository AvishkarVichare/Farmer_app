const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    // required: true
  },
  ownerName:{
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true

  },
  buyers:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  ]
 
  
},
{
  timestamps: true
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;