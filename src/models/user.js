const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    role:{
        type:String,
        enum:{
            values:["user","moderator","admin"],
            message:`&{values} is not valid !!!`
        },
        default:"user"
    },
    fullName:{
        type:String,
    },
    userName:{
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
    oauthProvider: {
        type:String
    },       
    oauthProviderId:{
        type:String
    },
    location:{
        type:String
    },
    language:{
        type:String
    },
    category:{
        type:String
    },
    bio:{
        type:String
    },
    status:{
        type:String,
        enum:["Active","Blocked"]
    }
},
{timestemps:true}
);


const User = mongoose.model("User",userSchema);
module.exports = User;