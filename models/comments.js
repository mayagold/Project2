// Dependencies
//*******************************************************
const mongoose = require('mongoose');

// Schema
//*******************************************************
const comment = new mongoose.Schema({
  username: String,
  profpic: String,
  posts: [Post.schema],
  about: [],
});

// Model
//*******************************************************
const Member = mongoose.model('Member', memberSchema);

// Module exports
//*******************************************************
module.exports = Member;
