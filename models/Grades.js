const mongoose = require('mongoose');

const GradesSchema = mongoose.Schema({
    studentAlbum: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Grades', GradesSchema);
