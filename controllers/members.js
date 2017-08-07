const express = require('express');
const Member = require('../models/members.js');
const Post = require('../models/posts.js');
const router = express.Router();
const User = require('../models/users.js');

// get index page of all members
router.get('/', (req,res)=>{
  Member.find({}, (err,foundMembers)=>{
    res.render('members/index.ejs', {
      members: foundMembers
    })
  })
})

// get new member page
router.get('/new', (req,res)=>{
  res.render('members/new.ejs')
})

// create new member
router.post('/', (req,res)=>{
  Member.create(req.body, (err,createdMember)=>{
    res.redirect('/members');
  })
})

// members show page
router.get('/:id', (req,res)=>{
  Member.findById(req.params.id, (err,foundMember)=>{
    res.render('members/show.ejs', {
      members: foundMember
    })
  })
})

// members edit page
router.get('/:id/edit', (req,res)=>{
  Member.findById(req.params.id, (err,foundMember)=>{
    res.render('members/edit.ejs', {
      member: foundMember
    })
  })
})

// members update route
router.put('/:id', (req,res)=>{
  Member.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/members')
  })
})




// members delete route
router.delete('/:id', (req,res)=>{
  // User.findByIdAndRemove(req.params.id, (err,foundUser)=>{
  //   console.log(foundUser);
  // });
  Member.findOneAndRemove(req.params.id, (err,foundMember)=>{
    const postIds = [];
    for (let i=0; i<foundMember.posts.length; i++){
      postIds.push(foundMember.posts[i]._id);
    } Post.remove(
      {
        _id: {
          $in: postIds
        }
      }, (err,data)=>{
        res.redirect('/posts')
      }
    )
  })
})



module.exports = router;
