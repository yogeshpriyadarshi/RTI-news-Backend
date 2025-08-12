const mongoose = require("mongoose");

const reporterSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    DOB:{
       type:Date,
       required: true
    },
    gender:{
        type: String,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    passwordHash:{
        type: String
    },
    address:{
        type:String
    },
    aadhar:{
        type:String
    },
    photo:{
        type:String
    },
    location:{
        type:String
    },  
    designation:{
        type:String
    }, 
    exprience:{
        type:String
    },
    status:{
        type:String,
        enum:["Approved","Rejected","Pending"],
        default:"Pending"
    }
},
{timestemps:true}
);



const Reporter = mongoose.model("reporter",reporterSchema);
module.exports = Reporter;