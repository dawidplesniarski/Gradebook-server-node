const mongoose = require('mongoose');

const UniversitySchema = mongoose.Schema({
    universityName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('University', UniversitySchema);