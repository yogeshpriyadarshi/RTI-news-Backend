const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    languageId:{
        type: mongoose.Types.ObjectId,
        ref:"Language",
        required:true
    },
    category:{
        type:String,
        required:true,
        unique:true
    }
}, { timestamps: true });

const Category = mongoose.model("Category",categorySchema);

module.exports = Category;