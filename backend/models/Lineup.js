const mongoose = require("mongoose");


const lineupSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    // playerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    playerId: {
        type: String,
        required: true
    },
    playerName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
});

const Lineup = mongoose.model("lineup", lineupSchema)

module.exports = Lineup;