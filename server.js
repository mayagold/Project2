const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));




mongoose.connect('mongodb://localhost:27017/project2');

mongoose.connection.once('open', ()=>{
	console.log('just a shout away');
});

app.listen(3000, ()=>{
	console.log('start me up');
});
