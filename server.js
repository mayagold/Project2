//*******************************************************
//*******************************************************
//
//    Server
//
//*******************************************************
//    Dependencies, models, controllers
//*******************************************************
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: 'this is secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static('public'));

const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);
const membersController = require('./controllers/members.js');
app.use('/members', membersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//*******************************************************
//    Index page
//*******************************************************
app.get('/', (req,res)=>{
  res.render('index.ejs');
})

//*******************************************************
//    Info pages
//*******************************************************
app.get('/about', (req,res)=>{
  res.render('about.ejs')
})

app.get('/contact', (req,res)=>{
  res.render('contact.ejs')
})

//*******************************************************
//    Connected to Mongo
//*******************************************************
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project2'
mongoose.connect(mongoUri);
mongoose.connection.once('open', ()=>{
	console.log('just a shout away');
});

//*******************************************************
//    Server running on port: 3000
//*******************************************************
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
	console.log('server running on port: ' + port);
});
