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
      const {phone} = req.body;
      const user = new User({phone});
      await user.save();
      // generate jwt token.
      const token = jwt.sign(phone,process.env.JWT_SECURITY);
      res.send(token);
    }catch(err){
     console.error(err);
    }
})

module.exports = Router;