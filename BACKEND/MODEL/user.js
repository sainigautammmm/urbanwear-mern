const mongoose = require("mongoose");

const userSchema  =  new  mongoose.Schema({
       
    name:{type:String,required:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    otp:{type:Number,default:null},
    token:{type:String,default:null},
    isverified:{type:Boolean,default:null}
})

const  usermodel =  new mongoose.model('user',userSchema);

module.exports = usermodel;