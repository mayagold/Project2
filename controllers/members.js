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
// Index  : GET    '/products'          1/7
// Show   : GET    '/products/:id'      2/7
// New    : GET    '/prodcuts/new'      3/7
// Create : POST   '/products'          4/7
// Edit   : GET    '/products/:id/edit' 5/7
// Update : PUT    '/products/:id'      6/7
// Delete : DELETE '/products/:id'      7/7
//*******************************************************



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


//*******************************************************
//*******************************************************
// seed route: visit once to populate database
//*******************************************************
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
//*******************************************************
// Alternate route: Via seed file
//*******************************************************
//*******************************************************





//*******************************************************
//*******************************************************
// Drop database
//*******************************************************
//*******************************************************
router.get('/dropdatabase/cannotundo', (req,res)=>{
  Member.collection.drop();
  res.redirect('/members')
})

//*******************************************************
// router export

module.exports = router;
