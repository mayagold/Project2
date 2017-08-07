const mongoose = require('mongoose');
const Post = require('./posts.js');

const memberSchema = new mongoose.Schema({
  username: String,
  posts: [Post.schema]
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
