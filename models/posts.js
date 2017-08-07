const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String},
  img: {type: String},
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 
