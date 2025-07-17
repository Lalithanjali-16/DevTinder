const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(
    "mongodb+srv://lalithanjali:Kin7jBebnBMUMowH@node.62bh2zn.mongodb.net/devTinder"
);
}

module.exports = connectDB
