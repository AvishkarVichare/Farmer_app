const express = require('express');
const router = express.Router();
const {signUpUserController, loginController} = require('../controllers/userController');

router.post('/signup', signUpUserController);
router.post('/login', loginController);

module.exports = router;