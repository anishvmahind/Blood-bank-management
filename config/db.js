const mongoose = require('mongoose')

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`conncted to db ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Mongodb error ${error}`.bgRed.white);
    }
}

module.exports = connectDb;