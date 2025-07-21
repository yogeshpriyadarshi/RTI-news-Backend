const mongoose = require("mongoose");

const newsPostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User", 
    required: true
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
    }
},
{timestamps:true}
)

const NewsPost = mongoose.model( "newsPost", newsPostSchema);