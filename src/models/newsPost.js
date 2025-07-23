const mongoose = require("mongoose");

const newsPostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",  
},
    headline:{
        type:String
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
    category:{
        type:String
    },
    language:{
        type:String
    },
    status:{
        type:String,
        enum:["approve", "pending","rejected"],
        default:"pending"
    },
    image:{
        type:String,
        default:null
    },
    video:{
        type:String,
        default:null
    }
},
{timestamps:true}
)

const NewsPost = mongoose.model( "newsPost", newsPostSchema);
module.exports = NewsPost;