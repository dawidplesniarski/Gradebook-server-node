const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CourseSubjects = Schema({
    course: {
        type: String,
        required: true
    },
    semesters:[
        [
            {
                type:String
            }
        ]
    ]
});


module.exports = mongoose.model('CourseSubjects', CourseSubjects);