const mongoose = require('mongoose');
// const subjectDetails = require('../models/SubjectDetails');

const SubjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    // subjectDetails: subjectDetails
});

module.exports = mongoose.model('Subject', SubjectSchema);