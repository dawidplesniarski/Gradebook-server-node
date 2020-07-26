const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')
app.use(bodyParser.json());


const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const gradesRoute = require('./routes/grades');
const testRoute = require('./routes/tests');

app.use('/posts',postsRoute);
app.use('/users',usersRoute);
app.use('/grades',gradesRoute);
app.use('/test',testRoute);


//Connect db
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    ()=> console.log('DB connected')
);


//ROUTES
app.get('/',(req,res)=>{
  res.send('test');
});

app.listen(process.env.PORT || 3000);
