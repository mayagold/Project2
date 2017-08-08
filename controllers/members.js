//*******************************************************
//*******************************************************
//
//    Members Controller
//
//*******************************************************
//    Dependencies, models
//*******************************************************
const express = require('express');
const Member = require('../models/members.js');
const Post = require('../models/posts.js');
const router = express.Router();
const User = require('../models/users.js');

//*******************************************************
//    Restful Routes
//*******************************************************
//*******************************************************
// Index  : GET    '/members'               1/7
// Show   : GET    '/members/show/:id'      2/7
// New    : GET    '/members/new'           3/7
// Create : POST   '/members'               4/7
// Edit   : GET    '/members/show/:id/edit' 5/7
// Update : PUT    '/members/show/:id'      6/7
// Delete : DELETE '/members/show/:id'      7/7
//*******************************************************

//*******************************************************
// Index  : GET    '/members'               1/7
//*******************************************************
router.get('/', (req,res)=>{
  Member.find({}, (err,foundMembers)=>{
    res.render('members/index.ejs', {
      members: foundMembers
    })
  })
})

//*******************************************************
// New    : GET    '/members/new'           3/7
//*******************************************************
router.get('/new', (req,res)=>{
  res.render('members/new.ejs')
})

//*******************************************************
// Create : POST   '/members'               4/7
//*******************************************************
// New member is created in controllers/sessions.js when new user is created

//*******************************************************
// Show   : GET    '/members/show/:id'      2/7
//*******************************************************
router.get('/show/:id', (req,res)=>{
  Member.findById(req.params.id, (err,foundMember)=>{
    console.log(foundMember);
    res.render('members/show.ejs', {
      member: foundMember,
    })
  })
})

//*******************************************************
// Edit   : GET    '/members/show/:id/edit' 5/7
//*******************************************************
router.get('/show/:id/edit', (req,res)=>{
  Member.findById(req.params.id, (err,foundMember)=>{
    res.render('members/edit.ejs', {
      member: foundMember
    })
  })
})

//*******************************************************
// Update : PUT    '/members/show/:id'      6/7
//*******************************************************
router.put('/show/:id', (req,res)=>{
  Member.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/members')
  })
})

//*******************************************************
// Delete : DELETE '/members/show/:id'      7/7
//*******************************************************
router.delete('/show/:id', (req,res)=>{
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

//*******************************************************
// seed route: visit once to populate database
//*******************************************************
router.get('/seed/data', (req,res)=>{
  const newMembers = [
    {
      username: "SkiBum",
      posts: [ {
        title: "Check out this yardsale",
        body: "my buddy and i hit the backcountry yesterday...",
        img: "https://media.giphy.com/media/l396J8if3vAF0MqnC/giphy.gif",
      }
      ]
    },
    {
      username: "PowHound",
      posts: [
        {
          title: "Japan - big lines?",
          body: "Who's been to Japan? Advice on where to ski big lines? Going for the first time this Feb",
        }
      ]
    },
    {
      username: "Snickers",
      posts: [ {
        title: "Check out this yardsale",
        body: "my buddy and i hit the backcountry yesterday...",
        img: "https://media.giphy.com/media/l396J8if3vAF0MqnC/giphy.gif",
      }
      ]
    },
    {
      username: "CharlieHorse",
      posts: [ {
        title: "Check out this yardsale",
        body: "my buddy and i hit the backcountry yesterday...",
        img: "https://media.giphy.com/media/l396J8if3vAF0MqnC/giphy.gif",
      }
      ]
    }
  ];
  Member.create(newMembers, (err,members)=>{
    if (err) {
      console.log(err);
    } else {
      for (i=0; i<newMembers.length; i++) {
        const post = newMembers[i].posts;
        Post.create(post, (err,createdPost)=>{
          console.log(createdPost);
        })
      }
    }
    res.redirect('/posts');
  })
})

//*******************************************************
// Alternate seed route: via seed file
//*******************************************************
const dataSeeds = require('../models/seed.js');
router.get('/seed/newdata/viaseedfile', (req,res)=>{
  Member.insertMany(dataSeeds, (err,members)=>{
    if (err) {
      console.log(err);
    } else {
      for (i=0; i<dataSeeds.length; i++) {
        const post = dataSeeds[i].posts;
        post[0].memberId = dataSeeds[i].username;
        console.log(post[0]);
        Post.create(post, (err,createdPost)=>{
            console.log(createdPost);
        })
      }
    }
    res.redirect('/posts');
  })
})

//*******************************************************
// Drop database - cannot undo
//*******************************************************
router.get('/dropdatabase/cannotundo', (req,res)=>{
  Member.collection.drop();
  Post.collection.drop();
  User.collection.drop();
  res.redirect('/sessions/register')
})

//*******************************************************
// module exports - access this file in server.js
//*******************************************************
module.exports = router;
