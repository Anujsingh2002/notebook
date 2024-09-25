const mongoose = require('mongoose');
mongoURI=`mongodb+srv://anuj:anuj@cluster0.hpuaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDB= async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("database connected successfully");
    } catch (err) {
        console.log("failed to connect",err);
    }
    
}

module.exports=connectDB;
