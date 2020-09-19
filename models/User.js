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
    isAdmin: {
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
    university: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    courseId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', UserSchema);
