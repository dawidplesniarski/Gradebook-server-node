const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')


const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



const usersRoute = require('./routes/users');
const gradesRoute = require('./routes/grades');
const testRoute = require('./routes/tests');
const permissionRoute = require('./routes/permissions');
const coursesRoute = require('./routes/courses');
const universityRoute = require('./routes/university');
const subjectsRoute = require('./routes/subjects');
const courseSubjectsRoute = require('./routes/courseSubjects');
const subjectDetailsRoute = require('./routes/subjectDetails');
const employeeRoute = require('./routes/employees');

app.use('/users', usersRoute);
app.use('/grades', gradesRoute);
app.use('/test', testRoute);
app.use('/permission', permissionRoute);
app.use('/course', coursesRoute);
app.use('/university', universityRoute);
app.use('/subject', subjectsRoute);
app.use('/courseSubjects', courseSubjectsRoute);
app.use('/subjectDetails', subjectDetailsRoute);
app.use('/employee', employeeRoute);


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
    res.send('Hello Gradebook server!');
});

app.listen(process.env.PORT || 3000);
