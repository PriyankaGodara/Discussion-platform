const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONN);
        
        console.log('MongoDB connected');
    }  catch (err) {
       console.error(err.message);
    }
};

module.exports = connectDB;
