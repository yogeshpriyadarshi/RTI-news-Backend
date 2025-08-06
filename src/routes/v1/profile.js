const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const User = require("../../models/user");
const bcrypt =require('bcrypt');
const logger = require("../../utils/logger");

const Router = express.Router();

Router.get("/fetchprofile",checkAuth,async(req,res)=>{
    try{
        //current user
        const user=req.user;
        res.json({
            message:"successful",
            user,
        })


    }catch(err){
           res.status(400).json({ message:"something went wrong!!!"  });
    }
})

Router.patch("/updateprofile",checkAuth,async(req , res)=>{
   try{
   const {userName, fullName, email,phone} =req.body;
   // check email and phone is avaiable
   if(!email || !phone ){
    return res.status(500).json({ 
        message:"not valid input"
    })
   }
   const user = req.user;
   if (userName !== undefined) user.userName = userName;
    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;

   const update = await user.save();
   res.json({
    message:"successfull",
    user:update
   })
   }catch(err){
   res.json({ message:"something went wrong!!!"  });
   }
});

//change password
Router.patch("/changepassword",checkAuth, async(req, res)=>{
    try{
        const user=req.user;
        if(!password){
            return res.status(500).json({message:"password is not provided!!!"})
        }
        // hashpassword:
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
        await user.save();
    }catch(err){
        logger.error(err);
        res.status(500).json({message:"something went wrong!"})
    }
})

module.exports = Router;