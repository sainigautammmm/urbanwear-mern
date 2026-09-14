const mongoose = require("mongoose");
require("dotenv").config();


const url = process.env.DATABASE;

const connectDatabase = async ()=>{
    try {
        await mongoose.connect(url);
        console.log("database connected succesfully");
    } catch (error) {
      console.log(`Failed to connect with database  ${error.message}`);   
    }
};
module.exports=connectDatabase;
