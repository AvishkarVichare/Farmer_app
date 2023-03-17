const express = require('express');
const { createOrder } = require('../controllers/order.Controller');
const { createProductController, buyProductController, getProductsController } = require('../controllers/product.Controller');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

router.get('/get', fetchUser, getProductsController);
router.post('/create', fetchUser, createProductController);
router.post('/buy/:productId', fetchUser, buyProductController);
router.post('/createOrder',fetchUser,createOrder)

module.exports = router;
