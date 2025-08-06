const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const Reporter = require("../../models/reporterRTI");
const upload = require("../../utils/upload");

const Router = express.Router();

Router.post("/application", checkAuth,upload.single('media'), async(req, res )=>{
  try {
    const {
    name,
    DOB,
    gender,
    email,
    phone,
    address,
    aadhar,
    location, 
    designation,
    exprience
    } = req?.body;

    if( !name || !gender || !email || !phone || !address || !aadhar ||
         !location ||!designation || !exprience){
            return res.status(400).json({message:"All fileds are required!!"});
         }

    const file = req.file;
    // ✅ Validate file
    if (!file || !file.path) {
      return res.status(400).json({ message: "Media file is required" });
    }

    const isVideo = file.mimetype.startsWith("video");
    if(isVideo){
        return res.status(400).json({ message: "only image is required" });
    }
    const photo = file.path;
    
const fileds ={ 
    name,
    DOB,
    gender,
    email,
    phone,
    address,
    aadhar,
    photo,
    location, 
    designation,
    exprience 
}

    const save = new Reporter(fileds);
    const savedFields = save.save();

    res.status(200).json({message:"Application submitted."},savedFields);   
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving token");
  }
})


module.exports= Router;

