//*******************************************************
//*******************************************************
//
//    Posts Controller
//
//*******************************************************
//    Dependencies, models
//*******************************************************
const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');
const Member = require('../models/members.js');
const User = require('../models/users.js');

//*******************************************************
//    Restful Routes
//*******************************************************
//*******************************************************
// Index  : GET    '/posts'               1/7
// Show   : GET    '/posts/show/:id'      2/7
// New    : GET    '/posts/new'           3/7
// Create : POST   '/posts'               4/7
// Edit   : GET    '/posts/show/:id/edit' 5/7
// Update : PUT    '/posts/show/:id'      6/7
// Delete : DELETE '/posts/show/:id'      7/7
//*******************************************************


//*******************************************************
// Index  : GET    '/posts'               1/7
//*******************************************************
router.get('/', (req,res)=>{
  User.find(req.session.user, (err,foundUser) =>{
    // console.log(foundUser[0].username);
      const user = foundUser[0].username;
      Member.findOne({'username':user}, (err,foundMember)=>{
        console.log(foundMember);
        Post.find({}, (err,foundPosts)=>{
          res.render('posts/index.ejs', {
            posts: foundPosts,
            currentUser: foundUser[0].username,
            memberId: foundMember._id
          })
        })
      })
  })
})

//*******************************************************
// New    : GET    '/posts/new'           3/7
//*******************************************************
router.get('/new', (req,res)=>{
  Member.find({}, (err,allMembers)=>{
    User.find(req.session.user, (err,foundUser) =>{
      console.log(foundUser[0].username);
    res.render('posts/new.ejs', {
      members: allMembers,
      currentUser: foundUser[0].username,
    })
    })
  })
})

// assigns current user as author of post

//*******************************************************
// Create : POST   '/posts'               4/7
//*******************************************************
router.post('/', (req,res)=>{
  Member.findOne({'username':req.body.memberId}, (err,foundMember)=>{
    console.log(foundMember);
    Post.create(req.body, (err,createdPost)=>{
      foundMember.posts.push(createdPost);
      foundMember.save((err,data)=>{
        res.redirect('/posts')
      })
    })
  })
})

// adds new post to current user's posts array

//*******************************************************
// Show   : GET    '/posts/show/:id'      2/7
//*******************************************************
router.get('/show/:id', (req,res)=>{
  Post.findById(req.params.id, (err,foundPost)=>{
    console.log(foundPost);
    res.render('posts/show.ejs', {
      post: foundPost,

    })
  })
});

//*******************************************************
// Edit   : GET    '/posts/show/:id/edit' 5/7
//*******************************************************
router.get('/show/:id/edit', (req,res)=>{
  Post.findById(req.params.id, (err,foundPost)=>{
    Member.find({}, (err,allMembers)=>{
      Member.findOne( {'posts._id':req.params.id}, (err, foundPostAuthor)=>{
        res.render('posts/edit.ejs', {
          post: foundPost,
          members: allMembers,
          postAuthor: foundPostAuthor
        })
      })
    })
  })
})

//*******************************************************
// Delete : DELETE '/posts/show/:id'      7/7
//*******************************************************
router.delete('/show/:id', (req,res)=>{
  Post.findByIdAndRemove(req.params.id, (err,foundPost)=>{
    Member.findOne( {'posts._id':req.params.id}, (err,foundMember)=>{
      foundMember.posts.id(req.params.id).remove();
      foundMember.save((err,data)=>{
        res.redirect('/posts')
      })
    })
  })
})

//*******************************************************
// Update : PUT    '/posts/show/:id'      6/7
//*******************************************************
router.put('/show/:id', (req,res)=>{
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedPost)=>{
    Member.findOne({'posts._id':req.params.id}, (err,postAuthor)=>{
      postAuthor.posts.id(req.params.id).remove();
      postAuthor.posts.push(updatedPost);
      postAuthor.save((err,data)=>{
        res.redirect('/posts/show/'+req.params.id), {
          post: updatedPost
        }
      })
    })
  })
})

//*******************************************************
// module exports - access this file in server.js
//*******************************************************
module.exports = router;
