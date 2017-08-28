// Dependencies
//*******************************************************
const mongoose = require('mongoose');

// Schema
//*******************************************************
const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String},
  img: {type: String},
  memberId: {type: String},
  commentCount: {type: Number, default: 0},
  comments: [ {type: String} ],
  likes: {type: Number, default: 0}
})

// model
//*******************************************************
const Post = mongoose.model('Post', postSchema);

// module exports
//*******************************************************
module.exports = Post;
