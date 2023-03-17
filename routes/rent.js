const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const { createRentPostController, getRentPostsController, editRentController} = require('../controllers/Rent.Controller')

router.get('/get', fetchUser, getRentPostsController);
router.post('/create', fetchUser, createRentPostController);
router.put('/edit/:rentId', fetchUser, editRentController);

module.exports = router;
