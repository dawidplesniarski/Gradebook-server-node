const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')
app.use(bodyParser.json());


const usersRoute = require('./routes/users');
const gradesRoute = require('./routes/grades');
const testRoute = require('./routes/tests');
const permissionRoute = require('./routes/permissions');
const coursesRoute = require('./routes/courses');
const universityRoute = require('./routes/university');
const subjectsRoute = require('./routes/subjects');
const courseSubjectsRoute = require('./routes/courseSubjects');

app.use('/users', usersRoute);
app.use('/grades', gradesRoute);
app.use('/test', testRoute);
app.use('/permission', permissionRoute);
app.use('/course', coursesRoute);
app.use('/university', universityRoute);
app.use('/subject', subjectsRoute);
app.use('/courseSubjects', courseSubjectsRoute);


//Connect db
mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('DB connected')
);

//ROUTES
app.get('/', (req, res) => {
    res.send('test');
});

app.listen(process.env.PORT || 3000);
