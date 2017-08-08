const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');
const Member = require('../models/members.js');
const User = require('../models/users.js');


// render posts index page
router.get('/', (req,res)=>{
  Post.find({}, (err,foundPosts)=>{
    res.render('posts/index.ejs', {
      posts: foundPosts
    })
  })
})

// render new post page - automatically finds the current user and assigns them authorship of the post
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


// post a new post - adds it to current user's posts array
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


// render show page
router.get('/show/:id', (req,res)=>{
  Post.findById(req.params.id, (err,foundPost)=>{
    console.log(foundPost);
    res.render('posts/show.ejs', {
      post: foundPost,

    })
    // Member.findOne({'posts._id':req.params.id}, (err,foundMember)=>{
    //   console.log(foundMember);
    //
    // })
  })
});


// render edit page
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


// delete route for posts
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


// update route for posts
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


module.exports = router;
