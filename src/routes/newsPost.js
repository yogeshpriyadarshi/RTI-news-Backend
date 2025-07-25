const express = require("express");
const multer = require('multer');
const checkAuth = require("../middleware/checkAuth");
const NewsPost = require("../models/newsPost");
const upload = require("../utils/upload");

const Router = express.Router();

Router.post('/uploadNews', upload.single('media'), async (req, res) => {
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

Router.get('/fetchNews', async (req, res) => {
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
