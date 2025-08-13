const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    feedback:{
        type:String,
    },

})

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
        enum:["Approved", "Pending","Rejected"],
        default:"Pending"
    },
    image:{
        type:String,
        default:null
    },
    video:{
        type:String,
        default:null
    },
    feedbackArray:{
        type: [feedbackSchema],
    }
},
{timestamps:true}
)

const NewsPost = mongoose.model( "newsPost", newsPostSchema);
module.exports = NewsPost;