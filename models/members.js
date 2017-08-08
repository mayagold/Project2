// Dependencies
//*******************************************************
const mongoose = require('mongoose');
const Post = require('./posts.js');

// Schema
//*******************************************************
const memberSchema = new mongoose.Schema({
  username: String,
  posts: [Post.schema],
  about: [],
});

// Model
//*******************************************************
const Member = mongoose.model('Member', memberSchema);

// Module exports
//*******************************************************
module.exports = Member;
