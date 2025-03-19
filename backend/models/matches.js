const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    home_team: {
        type: String,
        required: true
    },
    away_team: {
        type: String,
        required: true
    },
    match_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Live', 'Completed'],
        required: true
    }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = { Match }
