const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const Router = express.Router();

Router.post("/signup",async(req, res)=>{
try{
    console.log(req.body);
    const {firstName, lastName,email, age} = req.body;
    const user = new User({firstName, lastName,email, age});
    const update = await user.save();
    res.send(update);
}catch(err){
    console.error(err);
    res.send(err);
}
});

Router.post("/phone",async(req , res )=>{
    try{
      const {phone} = req?.body;
      if(!phone){
        return res.json({message:"Phone number is not provided."})
      }
      // if user is available 
      let user = await User.findOne({phone});
      // if user is available in database then create new one.
      if(!user){
         user = new User({phone});
            user=  await user.save();
      }
      // generate jwt token.
      const token = await jwt.sign({ _id: user?._id }, process.env.JWT_SECURITY);
      res.status(200).json({
      message: 'Authentication successful',
      token,
      user,
    })
    }catch(err){
     console.error(err);
     res.status(400).json({message:"something went wrong",
        error:err
     })
    }
})

module.exports = Router;