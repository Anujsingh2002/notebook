const mongoose = require('mongoose');
const dotenv= require('dotenv');

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
