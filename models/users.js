// Dependencies
//*******************************************************
const mongoose = require('mongoose');

// Schema
//*******************************************************
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
})

// Model
//*******************************************************
const User = mongoose.model('userSchema', userSchema);

// Module exports 
//*******************************************************
module.exports = User;
