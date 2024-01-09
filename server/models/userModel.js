const mongoose = require("mongoose");

const user = mongoose.Schema({
    userId:{
        type:Number,
        required:true
    },   
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    restaurentId:{
        type:Number,
        required:true
    },
    token:{
        type:String,
        default:''
    } 
});

const User= mongoose.model("User",user);
module.exports = User;