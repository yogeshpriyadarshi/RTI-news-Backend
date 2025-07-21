const mongoose = require("mongoose");

const notifcationSchema = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId
    },
    message:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

const Notifcation = mongoose.model("Notifcation",notifcationSchema);

module.exports = Notifcation;