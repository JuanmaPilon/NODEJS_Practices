const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    editors_choice: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema);