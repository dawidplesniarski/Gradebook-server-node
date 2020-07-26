const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    answers:[
        {
            type: String,
            required: true
        },
        {
            type: String,
            required: true
        },
        {
            type: String,
        },
        {
            type: String,
        }
    ]
});


module.exports = mongoose.model('Test',TestSchema);
