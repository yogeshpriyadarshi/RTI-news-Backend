const express = require("express");
const multer = require('multer');
const checkAuth = require("../../middleware/checkAuth");
const NewsPost = require("../../models/newsPost");
const upload = require("../../utils/upload");

const NotifcationToken = require("../../models/notificationToken");
const { admin } = require("../../utils/firebase");
const { default: axios } = require("axios");

const Router = express.Router();

// Third party api
Router.get("/newsdata",checkAuth,async(req, res)=>{
    try{
        const key=process.env.NEWS_THIRD_PARTY;
        const news = await axios.get(`https://newsdata.io/api/1/latest`,
        {params:{
            apikey:key,
            country: 'in',
            language: req.query.lang || 'en'

        }});
    console.log(" news form third api", news.data);
    res.send(news?.data);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: " failed news fetching" });
    }
});
// upload news.
Router.post('/uploadnews', checkAuth, upload.single('media'), async (req, res) => {
  try {
    const { headline, description, location, category, language } = req.body;
    const file = req.file;

    // ✅ Validate required fields
    if (!headline || !description || !location || !category || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate file
    if (!file || !file.path) {
      return res.status(400).json({ message: "Media file is required" });
    }

    const isVideo = file.mimetype.startsWith("video");
    const fileUrl = file.path;

    const post = new NewsPost({
      userId: req.user._id,
      headline,
      description,
      location,
      category,
      language,
      image: isVideo ? null : fileUrl,
      video: isVideo ? fileUrl : null,
    });

    const savedPost = await post.save();

    return res.status(201).json({
      message: "News uploaded successfully",
      news: savedPost,
    });

  } catch (err) {
    console.error("Error uploading news:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// fetch news based on pending
Router.get('/pendingnews',checkAuth, async (req, res) => {
  try { 
    filter={status:"pending"}
    const news = await NewsPost.find(filter);
       res.json({
        message:"successful fetch pending news!!!",
        news
       });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " failed news fetching" });
  }
});

// mediator will change status pending=>approved or pending=>rejected
Router.patch('/changestatus',checkAuth, async (req, res) => {
  try { 
    const _id = req.body?.id;
    const status=req?.body?.status;
    const news = await NewsPost.findByIdAndUpdate(_id, {status}, { new: true });
    if(status=="approved"){
         // as soon as news is approved send notification to all user
  
   const allTokens = await NotifcationToken.find({});
   const tokens = allTokens.map((t) => t.token);
//     console.log("list of token",tokens);

    if (!tokens.length) return res.send("No tokens to send");
    const title = news?.headline;
     const  body= news?.description;
    const message = {
      tokens,
      notification: { title, body },
    };

  const response = await admin.messaging().sendEachForMulticast(message);
    const failedTokens = [];
    response.responses.forEach((resp, i) => {
     if (!resp.success) {
       failedTokens.push(tokens[i]);
      }
    });

    }else if(status=="rejected"){
       const userId = news?.userId;
       const token = await NotifcationToken.findOne({userId});

    if (!token) return res.send("No tokens to send");
    const title = news?.headline;
    const body= news?.description;
    const message = {
      token,
      notification: { title, body },
    };
    const response = await admin.messaging().send(message);
    }


       res.json({
        message:`status of news is changed to ${req?.body?.status}`,
        news
       });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " failed news fetching" });
  }
});
// fetch news based on language, location and category 
Router.get('/fetchnews', async (req, res) => {
  try { 
    const {language,category} = req.query;
    const filter = {};
    filter.status="approved";
  if (language){
     filter.language = language;
  } 
  if (category) filter.category = category;
  console.log(filter);

    const news = await NewsPost.find(filter);
       res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " failed news fetching" });
  }
});


Router.patch('/updateNews', checkAuth, upload.single('media'), async (req, res) => {
  try { 
    const fileUrl = req.file?.path;
    console.log(fileUrl);

    if (!fileUrl) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const isVideo = req.file.mimetype.startsWith("video");

    const post = new NewsPost({
      userId: req.body.userId,
      headline: req.body.headline,
      description: req.body.description,
      location: req.body.location,
      category: req.body.category,
      language: req.body.language,
      image: isVideo ? null : fileUrl,
      video: isVideo ? fileUrl : null,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

Router.get('/fetchallnews', async (req, res) => {
  try { 
    const news = await NewsPost.find({});
       res.status(200).json({message:"all news",news});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " failed news fetching" });
  }
});

module.exports = Router;
