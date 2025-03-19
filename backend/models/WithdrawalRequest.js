const mongoose = require("mongoose");
const { User } = require("./user")

const WithdrawalRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', required: true
    },
    requestedAmount: {
        type: Number,
        required: true,
        min: 50,
        max: 10000
    },
    paypalId: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dateRequested: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Rejected'],
        default: 'Pending'
    },
});

const WithdrawalRequest = mongoose.model("withdrawalrequest", WithdrawalRequestSchema)

module.exports = WithdrawalRequest

