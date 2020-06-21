const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')
app.use(bodyParser.json());


const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const gradesRoute = require('./routes/grades');

app.use('/posts',postsRoute);
app.use('/users',usersRoute);
app.use('/grades',gradesRoute);


const url = 'mongodb+srv://dawidplesniarski:zaqwsx@cluster0-fgsn7.mongodb.net/gradebook?retryWrites=true&w=majority\n';

//Connect db
mongoose.connect(url,
    {useNewUrlParser: true},
    ()=> console.log('DB connected')
);


//ROUTES
app.get('/',(req,res)=>{
  res.send('test');
});

app.listen(3000);
