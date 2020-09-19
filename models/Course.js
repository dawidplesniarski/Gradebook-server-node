const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Course', CourseSchema);