const express = require('express');
const router = express.Router();
const {signUpUserController, loginController, getUserController} = require('../controllers/userController');
const fetchUser = require('../middleware/fetchUser');

router.post('/signup', signUpUserController);
router.post('/login', loginController);
router.get('/get', fetchUser, getUserController );

module.exports = router;
