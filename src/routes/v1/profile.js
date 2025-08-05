const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const User = require("../../models/user");

const Router = express.Router();

Router.patch("/updateprofile",checkAuth,async(req , res)=>{
   try{
   const {userName, fullName, email,phone} =req.body;
   // check email and phone is avaiable
   if(!email || !phone ){
    return res.json({ 
        message:"not valid input"
    })
   }
   const user = req.user;
   user.userName = userName;
   user.fullName= fullName;
   user.email= email;
   user.phone = phone;
   const update = await user.save();
   res.json({
    message:"successfull",
    user:update
   })
   }catch(err){
   res.json({
    message:"something went wrong!!!",
    error:err
   });
   }
   



});

// change password 

// verirfy email 


//verify phone: this will be done throug forntendS



module.exports = Router;