const express = require('express');
const { createProductController, buyProductController, getProductsController } = require('../controllers/product.Controller');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

router.get('/get', fetchUser, getProductsController);
router.post('/create', fetchUser, createProductController);
router.post('/buy/:productId', fetchUser, buyProductController);

module.exports = router;
