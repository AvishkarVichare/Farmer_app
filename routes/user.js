const express = require('express');
const { getOrders } = require('../controllers/order.Controller');
const router = express.Router();
const {signUpUserController, loginController, getUserController, getUserBuyedProducts, getUserWhoBoughtProductds, getProductList, getDonationList} = require('../controllers/userController');
const fetchUser = require('../middleware/fetchUser');

router.post('/signup', signUpUserController);
router.post('/login', loginController);
router.get('/get', fetchUser, getUserController );
router.get('/getOrders', fetchUser, getUserBuyedProducts ); // get users --ignore this for now--
router.get('/getUsers/:productID', fetchUser, getUserWhoBoughtProductds ); //gets users who bought prouducts
router.get('/getProducts', fetchUser, getProductList); // gets product list 
router.get('/getDonationList',fetchUser,getDonationList);
router.get('/getOrderList',fetchUser,getOrders);
module.exports = router;
