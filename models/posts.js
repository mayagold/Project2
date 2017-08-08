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
})

// model
//*******************************************************
const Post = mongoose.model('Post', postSchema);

// module exports
//*******************************************************
module.exports = Post;
