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


router.get('/', (req,res)=>{
  User.find( {}, (err,foundUsers)=>{
    res.send(foundUsers)
  })
})

//*******************************************************
// Create : POST   '/sessions/register'          4/7
//*******************************************************
router.post('/register', (req,res)=>{
  let posts = [];
  let about = [];
  let passwordFail = false;
  if (req.body.password !== req.body.verifypassword) {
    console.log('fucked up');
    passwordFail = true;

  } else {
    req.session.logged = true;
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    let userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash;
    console.log("grabbed username " + req.body.username + "and password "+ req.body.password);
      // Create new member
    // Member.create(req.body, (err, createdMember)=>{
    //   createdMember.posts = posts;
    //   createdMember.about = about;
    //   console.log("created: "+createdMember+"and thats it");
    // });
    User.create(userDbEntry, (err,user)=>{
      req.session.user = user.username;
    });
    res.redirect('/posts');
  }
});

//*******************************************************
// Create : POST   '/sessions/login'             4/7
//*******************************************************
router.post('/login', (req,res)=>{
  User.findOne({username: req.body.username}, (err,user)=>{
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.username = req.body.username;
        req.session.logged = true;
        res.redirect('/posts');
      } else {
        console.log('else in bcrypt compare');
        res.redirect('/')
      }
    } else {
      res.redirect('/')
    }
  })
});

//*******************************************************
//        : GET    '/sessions/logout'            2/7
//*******************************************************
router.get('/logout', (req,res)=>{
  //i think i can delete the line below?
        User.remove(req.session.user);
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    } else {
      console.log('logged out');
      res.redirect('/')
    }
  })
});

//*******************************************************
// module exports - access this file in server.js
//*******************************************************
module.exports=router;
