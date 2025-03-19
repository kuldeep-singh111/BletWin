const mongoose = require("mongoose");


// wallet schema
const WalletSchema = new mongoose.Schema({

    depositAmount: {
        type: Number,
        default: 0
    },
    cashBonus: {
        type: Number,
        default: 0
    },
    winningAmount: {
        type: Number,
        default: 0
    },
    withdrawableAmount: {
        type: Number,
        default: 0
    },
    totalMoney: {
        type: Number,
        default: 0
    },
})

// const Wallet = mongoose.model("wallet", WalletSchema);



// User schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true,
        // unique: true,
    },
    referralCode: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },
    wallet: { type: WalletSchema, default: {} }
})

const User = mongoose.model("user", userSchema)

module.exports = User;
