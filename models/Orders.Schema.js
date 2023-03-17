const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    name: String,
    address: String,
    price:{
        type:Number
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    },
    quantity: Number,
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;