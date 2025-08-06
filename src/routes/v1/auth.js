const express = require("express");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { admin } = require("../../utils/firebase");
const logger = require("../../utils/logger");

const Router = express.Router();



Router.post("/signup",async(req, res)=>{
try{
    const authHeader = req.headers.authorization || '';
    const idToken = authHeader.split('Bearer ')[1];
    // ✅ Verify the Firebase ID token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const phone = decoded.phone_number;

    // 🧾 Find or create user in DB
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }
    // 🎫 (Optional) Generate your own JWT
    const jwtRTIToken = jwt.sign({ _id: user?._id },  process.env.JWT_SECURITY);

    res.status(200).json({
      message: 'Authentication successful',
      jwtRTIToken,
      user,
    })
}catch(err){
    console.error(err);
    logger.error(err);
     res.status(400).json({message:"something went wrong", })
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
      // if user is not available in database then create new one.
      if(!user){
         user = new User({phone});
            user=  await user.save();
      }
      // generate jwt token.
      const token = await jwt.sign({ _id: user?._id }, process.env.JWT_SECURITY);
      logger.info("phone login done!!!");
      res.status(200).json({
      message: 'Authentication successful',
      token,
      user,
    })
    }catch(err){
     console.error(err);
     logger.error(err);
     res.status(400).json({message:"something went wrong",
     })
    }
})

module.exports = Router;