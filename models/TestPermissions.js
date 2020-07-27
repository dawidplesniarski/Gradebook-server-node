const mongoose = require('mongoose');

const Permissions = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    userAlbums:[
        {
            type: String,
            required: true
        }
    ]
});


module.exports = mongoose.model('Permissions',Permissions);
