const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    entryFee: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    prizePool: { type: Number, required: true },
    playersJoined: { type: Number, default: 0 },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }], //  Teams participating
    players: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        totalPoints: { type: Number, default: 0 }
    }]
}, { timestamps: true });

const Contest = mongoose.model('Contest', ContestSchema);
module.exports = Contest;