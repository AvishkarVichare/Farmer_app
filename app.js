const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const rentRouter = require('./routes/rent');
const productRouter = require('./routes/product');


app.use(cors())
app.use(express.json());

app.use('/api/v1/u', userRouter);
app.use('/api/v1/p', postRouter);
app.use('/api/v1/r', rentRouter);
app.use('/api/v1/product', productRouter);


module.exports = app;