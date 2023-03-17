const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const rentRouter = require('./routes/rent');
const productRouter = require('./routes/product');
const Razorpay = require('razorpay')



// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
//   });
  

app.use(cors())
app.use(express.json());

app.use('/api/v1/u', userRouter);
app.use('/api/v1/p', postRouter);
app.use('/api/v1/r', rentRouter);
app.use('/api/v1/product', productRouter);


// app.post('/api/v1/orders',async(req, res)=>{
//     console.log(instance)
//         const options = {
//             amount: Number(req.body.amount * 100),
//             currency: "INR",
//         }
    
//         const order = await instance.orders.create(options);
//         // console.log(order);
//         res.json({order})
        
//     })

module.exports = app;