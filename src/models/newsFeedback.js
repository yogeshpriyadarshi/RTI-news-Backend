const { Timestamp } = require("firebase-admin/firestore");
const mongoose = require("mongoose");

const newsFeedbackSchema = mongoose.Schema({
    newsId: {
        type: mongoose.Types.ObjectId,
        ref:"Newspost"
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    feedbackId:{
        type:mongoose.Types.ObjectId,
    },
    feedback:{
        type: String
    }
},
{ timestamps: true });

const Feedback = mongoose.model("feedback", newsFeedbackSchema);
module.exports = Feedback;