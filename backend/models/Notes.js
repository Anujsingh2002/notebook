const mongoose=require('mongoose');

const notesSchema= new mongoose.Schema({
    usr:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'general'
    },
},{Timestamp:true})

module.exports=mongoose.model('notes',notesSchema);

