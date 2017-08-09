//*******************************************************
//*******************************************************
//
//    Sessions Controller
//
//*******************************************************
//    Dependencies, models
//*******************************************************
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Member = require('../models/members.js');
const bcrypt = require('bcrypt');


//*******************************************************
//    Restful Routes
//*******************************************************
//*******************************************************
//        : GET    '/sessions/register'          1/7
//        : GET    '/sessions/login'             2/7
//        : GET    '/sessions/logout'            2/7
// Create : POST   '/sessions/register'          4/7
// Create : POST   '/sessions/login'             4/7
//*******************************************************


//*******************************************************
//        : GET    '/sessions/register'          1/7
//*******************************************************
router.get('/register', (req,res,next)=>{
  res.render('users/register.ejs', {})
});

//*******************************************************
// Create : POST   '/sessions/register'          4/7
//*******************************************************
router.post('/register', (req,res,next)=>{
  let posts = [];
  let about = [];
  let password = req.body.password;
  let passwordHash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
  let userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err,user)=>{
    console.log("username: " + req.body.username + "and password "+ req.body.password);
    // req.session.user = user.username;
    // req.session.logged = true;
    Member.create(req.body, (err, createdMember)=>{
      createdMember.posts = posts;
      createdMember.about = about;
      console.log("created: "+createdMember+"and thats it");
      userDbEntry={};
    })
    res.redirect('/sessions/login');
  });
  // Create new member
});

//*******************************************************
//        : GET    '/sessions/login'             2/7
//*******************************************************
router.get('/login', (req,res,next)=>{
  res.render('users/login.ejs', {})
});

//*******************************************************
// Create : POST   '/sessions/login'             4/7
//*******************************************************
router.post('/login', (req,res,next)=>{
  User.findOne({username: req.body.username}, (err,user)=>{
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.username = req.body.username;
        req.session.logged = true;
        console.log(req.session, req.body);
        res.redirect('/posts');
      } else {
        console.log('else in bcrypt compare');
        res.redirect('/sessions/login')
      }
    } else {
      res.redirect('/sessions/login')
    }
  })
});

//*******************************************************
//        : GET    '/sessions/logout'            2/7
//*******************************************************
router.get('/logout', (req,res)=>{
        User.remove(req.session.user);
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    } else {
      console.log('logged out');
      res.redirect('/sessions/login')
    }
  })
});

//*******************************************************
// module exports - access this file in server.js
//*******************************************************
module.exports=router;
