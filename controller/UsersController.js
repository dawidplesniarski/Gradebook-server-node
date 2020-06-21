const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
app.use(bodyParser.json());

const usersRoute = require('./routes/users');

app.use('/users',usersRoute);

const url = 'mongodb+srv://dawid:dawid@cluster0-qrt6h.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url,
    {useNewUrlParser: true},
    ()=> console.log('DB connected')
);
