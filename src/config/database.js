const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(
    "mongodb+srv://lalithanjali:TisFx1jR03DKbAwY@node.62bh2zn.mongodb.net/devTinder"
);
}

module.exports = connectDB
