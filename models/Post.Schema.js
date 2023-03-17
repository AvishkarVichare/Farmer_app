const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    // required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    text: String,
    authorName: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  type: {
    type: String,
    required: true
  },
  donations:[
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      amount: Number,
      interest: Number
    }
  ]
},
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;