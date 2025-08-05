const express = require("express");
const multer = require('multer');
const checkAuth = require("../../middleware/checkAuth");
const NewsPost = require("../../models/newsPost");
const upload = require("../../utils/upload");

const NotifcationToken = require("../../models/notificationToken");
const { admin } = require("../../utils/firebase");
const { default: axios } = require("axios");

const Router = express.Router();


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
        res.send("something went wrong!!!");
    }
});

Router.post('/uploadnews', upload.single('media'), async (req, res) => {
  try { 
    console.log("I did  upload file here!!!");
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
   // await post.save();
    // as soon as news is posted send notification
  
    const allTokens = await NotifcationToken.find({});
    const tokens = allTokens.map((t) => t.token);
    console.log("list of token",tokens);

    if (!tokens.length) return res.send("No tokens to send");
 const title = req.body.headline;
    const  body= req.body.description;
    const message = {
      tokens,
      notification: { title, body },
    };

  // const response = await admin.messaging().sendMulticast(message);
const response = await admin.messaging().sendEachForMulticast(message);
    const failedTokens = [];
    response.responses.forEach((resp, i) => {
      if (!resp.success) {
        failedTokens.push(tokens[i]);
      }
    });

    res.json({
      success: response.successCount,
      failed: response.failureCount,
      failedTokens,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send notification");
  }
});

Router.get('/fetchnews', async (req, res) => {
  try { 
    console.log("I all news post file here!!!");
    console.log("what is stored in req.query",req?.query);
    const {language,category} = req.query;
    console.log("language",language);
    const filter = {};
  if (language) filter.language = language;
  if (category) filter.category = category;
    const news = await NewsPost.find({language,category});
       res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " failed news fetching", error: err.message });
  }
});

Router.patch('/updateNews', upload.single('media'), async (req, res) => {
  try { 
    console.log("I did  upload file here!!!");
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

module.exports = Router;
