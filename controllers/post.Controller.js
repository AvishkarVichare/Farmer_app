const Post = require('../models/Post.Schema');
const User = require('../models/User.Schema');

exports.getPostsController =  async (req, res) => {
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
        const { title, description, imageUrl, type} = req.body;
        // console.log(req.user)
        const post = new Post({
            title,
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
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}


exports.likeUnlikePostController =   async (req, res) => {
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
       
        return  res.status(201).json({
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
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
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
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
  }