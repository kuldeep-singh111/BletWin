const mongoose = require("mongoose");

const ConnectToDB = async (url) => {
    return mongoose.connect(url)
}

module.exports = { ConnectToDB };