const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');


app.use(cors())
app.use(express.json());

app.use('/api/v1/u', userRouter);
app.use('/api/v1/p', postRouter);


module.exports = app;