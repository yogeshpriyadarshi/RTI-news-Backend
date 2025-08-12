const mongoose = require("mongoose");

const activistSchema = mongoose.Schema({
    name:{
        type:String,
    },
    DOB:{
       type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
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


const Activist = mongoose.model("activist",activistSchema);
module.exports = Activist;