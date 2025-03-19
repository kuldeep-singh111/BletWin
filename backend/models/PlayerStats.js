const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',  // Referring to the Match collection
        required: true
    },
    // playerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'lineup',
    //     required: true
    // },
    playerId: {
        type: String,
        required: true
    },

    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    shots: { type: Number, default: 0 },
    passes: { type: Number, default: 0 },
    tackles: { type: Number, default: 0 },
    interceptions: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    penaltiesScored: { type: Number, default: 0 }
});

const PlayerStats = mongoose.model('PlayerStats', playerStatsSchema);
module.exports = PlayerStats;
