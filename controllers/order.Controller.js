
const Order = require('../models/Orders.Schema');
const { findOne } = require('../models/Product.Schema');
const User = require('../models/User.Schema');

exports.getOrders = async(req, res)=>{

    try{
        const orders = await Order.find({seller: req.user}).populate("buyer");
            res.json({
            orders
        });

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.createOrder = async(req, res)=>{
    try{
        const user = req.user;
        const {name, address, contact, quantity,price, seller} = req.body;
        console.log(req.body);
        const order = await Order.create({
            name, address, contact, quantity,
            buyer: req.user, seller,price
        });

        const s = await User.findOne({_id:seller});
        s.balance = s.balance + price * parseInt(quantity);
        await s.save(s);

        const b = await findOne({_id:user});
        b.balance -= price * quantity;
        await b.save(b);
        if(b.balance < price * quantity){
            res.send({
                status:false,
                message:"insufficient balance",
            });
        }
        res.json(order);
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

