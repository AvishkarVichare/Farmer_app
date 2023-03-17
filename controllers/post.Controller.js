const Donation = require('../models/Donation.Schema');
const Post = require('../models/Post.Schema');
const User = require('../models/User.Schema');

exports.getPostsController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.createPostController = async (req, res) => {

  try {

    const user = await User.findById(req.user);
    const {  description, imageUrl, type } = req.body;
    
    // console.log(req.user)
    const post = new Post({
      userName: user.name,
      description,
      imageUrl,
      user: req.user,
      type
    });
    await post.save();

    res.status(201).json({
      success: true,
      post,
      message: 'post created successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

}


exports.likeUnlikePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
      await post.save();
      return res.status(201).json({
        success: true,
        post,
        message: 'post Liked successfully'
      });
    }
    
    post.likes.push(userId);
    await post.save();

    res.status(201).json({
      success: true,
      post,
      message: 'post unliked successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}


exports.LendRequest = async (req,res) =>{

  try {

    const user = req.user;
    const {receiverId,amount,intrest,postId} = req.body;

    const donation = new Donation({
      sender:user,
      receiver:receiverId,
      amount:amount,
      intrest:intrest,
      post:postId
    });
    await donation.save().then((res)=>{
      console.log(res);
    })
    res.send({
      status:200,
      message:"Lend request success",
    });


  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.getBids = async (req,res) =>{
    try{
        const {postId} = req.body;
        console.log(req.body);

        const bids = await Donation.find({post:postId}).populate("sender");
        res.status(200).json({
          success: true,
          bids
        }); 

    }catch(err){
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
}

exports.addComentController = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { text } = req.body;
    post.comments.push({
      text,
      authorName: user.name
    });
    await post.save();

    res.status(200).json({
      success: true,
      comment: text,
      message: "comment added successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.getCommentsController = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate({
      path: 'comments',
      options: { sort: { _id: -1 } },
      populate: {
        path: 'user',
        select: 'username'
      }
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      success: true,
      commenets: post.comments,
      message: "comments retrived"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}


// exports.createDonationBid = async(req, res)=>{
//   try{

//     const {postId} = req.params;
//     const {amount, interest} = req.body;
//     console.log(postId)
//     const post = await Post.findById(postId);
//     const bid = {
//       user: req.user,
//       amount,
//       interest
//     }

//     post.donations.push(bid);

//     await post.save();

//     res.status(200).json({
//       success: true,
//       bid,
//       message: "bid added successfully"
//     })

//   }catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     })
//   }
// }