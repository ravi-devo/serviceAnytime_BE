const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DB Connection successfull");
    } catch (error) {
        console.log("Error connecting DB", error);
    }
}

module.exports = dbConnection;