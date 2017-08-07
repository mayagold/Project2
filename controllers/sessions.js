const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');


// session register

router.get('/register', (req,res,next)=>{
  res.render('users/register.ejs', {})
});

router.post('/register', (req,res,next)=>{
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err,user)=>{
    console.log(user);
    req.session.user = user.username;
    req.session.logged = true;
    res.redirect('/posts')
  })
});


// session login

router.get('/login', (req,res,next)=>{
  res.render('users/login.ejs', {})
});

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


// session logout

router.get('/logout', (req,res)=>{
  req.session.destroy(function(err){
    if(err){

    } else {
      res.redirect('/sessions/login')
    }
  })
});


module.exports=router;
