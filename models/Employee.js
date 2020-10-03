const mongoose = require('mongoose');

const Employee = mongoose.Schema({
    academicTitle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
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
    universityId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'University'
        }
    ],
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Employee', Employee);