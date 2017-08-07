const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));



const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);


app.get('/', (req,res)=>{
  res.render('index.ejs');
})



const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project2'
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
	console.log('just a shout away');
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
	console.log('server running on port: ' + port);
});
