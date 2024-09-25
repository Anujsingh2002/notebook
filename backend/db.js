const mongoose = require('mongoose');
import dotenv from 'dotenv';

dotenv.config();
mongoURI=process.env.MONGO_URI

const connectDB= async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("database connected successfully");
    } catch (err) {
        console.log("failed to connect",err);
    }
    
}

module.exports=connectDB;
