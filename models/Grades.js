const mongoose = require('mongoose');

const GradesSchema = mongoose.Schema({
    studentAlbum: {
        type:String,
        required: true
    },
    grade:{
        type:Number,
        required: true
    },
    subject: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Grades',GradesSchema);
