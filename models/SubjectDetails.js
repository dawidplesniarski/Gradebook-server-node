const mongoose = require('mongoose'), Schema = mongoose.Schema;

const SubjectDetails = Schema({
    ects: {
        type: Number,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SubjectDetails', SubjectDetails);