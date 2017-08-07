const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');
const Member = require('../models/members.js');


// render posts index page
router.get('/', (req,res)=>{
  Post.find({}, (err,foundPosts)=>{
    res.render('posts/index.ejs', {
      posts: foundPosts
    })
  })
})

// render new post page
router.get('/new', (req,res)=>{
  Member.find({}, (err,allMembers)=>{
    res.render('posts/new.ejs', {
      members: allMembers
    })
  })
})

// post a new post
router.post('/', (req,res)=>{
  Member.findById(req.body.memberId, (err,foundMember)=>{
    Post.create(req.body, (err,createdPost)=>{
      foundMember.posts.push(createdPost);
      foundMember.save((err,data)=>{
        res.redirect('/posts')
      })
    })
  })
})


// render show page
router.get('/:id', (req,res)=>{
  Post.findById(req.params.id, (err,foundPost)=>{
    Member.findOne({'posts._id':req.params.id}, (err,foundMember)=>{
      res.render('posts/show.ejs', {
        member: foundMember,
        post: foundPost
      })
    })
  })
})


// render edit page
router.get('/:id/edit', (req,res)=>{
  res.render('posts/edit.ejs')
})


// delete route for posts
router.delete('/:id', (req,res)=>{
  Post.findByIdAndRemove(req.params.id, (err,foundPost)=>{
    Member.findOne( {'posts._id':req.params.id}, (err,foundMember)=>{
      foundMember.posts.id(req.params.id).remove();
      foundMember.save((err,data)=>{
        res.redirect('/posts')
      })
    })
  })
})





module.exports = router;
