const mongoose = require("mongoose");

const notifcationSchema = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId
    },
    token:{
        type:String
    },
    platform:{
        type:String,
    }
},
{timestamps:true}
)

const NotifcationToken = mongoose.model("NotifcationToken",notifcationSchema);

module.exports = NotifcationToken;