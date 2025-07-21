const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    language:{
        type:String,
        required:true,
        unique:true
    }
}, { timestamps: true });

const Languages = mongoose.model("Language",languageSchema);

module.exports = Languages;