const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    albumNo: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    courseId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

module.exports = mongoose.model('Users', UserSchema);
