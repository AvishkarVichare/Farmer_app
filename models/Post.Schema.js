const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    text: String,
    authorName: String
  }],
  type:{
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;