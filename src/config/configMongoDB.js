const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("DB is connected!!!");
    }catch(err){
       console.error("connection to db is not establised!!!");
    }
}

module.exports = connectDB;