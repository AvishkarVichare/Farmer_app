const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const {  likeUnlikePostController, createPostController, addComentController, getPostsController } = require('../controllers/post.Controller');

router.get('/get', fetchUser, getPostsController)
router.post('/create', fetchUser, createPostController);
router.post('/likeUnlike/:postId', fetchUser, likeUnlikePostController);
router.post('/addComent/:postId', fetchUser, addComentController)

module.exports = router;