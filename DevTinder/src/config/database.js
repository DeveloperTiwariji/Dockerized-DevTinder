const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
        maxPoolSize: 10,
        minPoolSize:5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });
};



module.exports = connectDB;