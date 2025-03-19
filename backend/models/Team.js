const mongoose = require('mongoose');
const { User } = require('./user');
const { Match } = require('./matches');

const teamSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  // Reference to User schema
        required: true
    },
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',  // Reference to Match schema
        required: true
    },
    selectedPlayers: {
        type: Array,
        required: true
    },
    substitutes: {
        type: Array,
        required: true
    },
    totalPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
