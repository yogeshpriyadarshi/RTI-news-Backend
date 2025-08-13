const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const Feedback = require("../../models/newsFeedback");

const Router = express.Router();

Router.post("/add",checkAuth,async(req, res)=>{
    try{
        const newsId = req?.body?.id;
        const feedback = req?.body?.feedback;
        const userId=req?.user?._id;
        if(!newsId || !feedback || !userId ){
            return res.status(500).json({
                message:"all fields are required!!!"
            })
        }
        const saveFeedback  = new Feedback({
            newsId,
            feedback,
            userId
        });
       const  savedFeedback  =await saveFeedback.save();
       res.status(200).json({
        message:"saved feedback!",
        savedFeedback
       })


    }catch(err){
       console.error(err);
       res.status(500).json({message:"something went wrong"});
    }

})

Router.get("/fetch",checkAuth,async(req,res)=>{
try{
    const id=req?.query?.id;
    if(!id){
        return res.status(500).json({
            message:"send news id"
        })
    }
    const feedback = await Feedback.find({newsId:id});
    res.status(200).json({
        message:"feedback done successfull",
        feedback
    })
}catch(err){
    console.error(err);
    res.status(500).json({message:"something went wrong!!!"});
}
})

module.exports = Router;