const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const {  likeUnlikePostController, createPostController, addComentController, getPostsController, getCommentsController, createDonationBid, LendRequest, getBids } = require('../controllers/post.Controller');

router.get('/get', fetchUser, getPostsController)
router.post('/create', fetchUser, createPostController);
router.post('/likeUnlike/:postId', fetchUser, likeUnlikePostController);
router.post('/addComent/:postId', fetchUser, addComentController)
router.get('/comments/:postId', fetchUser, getCommentsController)
router.post("/createBid/",fetchUser,LendRequest)
router.get("/getBids",fetchUser,getBids)


module.exports = router;
