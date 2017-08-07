const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');



router.get('/login', (req,res,next)=>{
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
  });
});



module.exports=router;
