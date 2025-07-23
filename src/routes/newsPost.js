const express = require("express");
const multer = require('multer');
const checkAuth = require("../middleware/checkAuth");
const NewsPost = require("../models/newsPost");
const upload = require("../utils/upload");

const Router = express.Router();

Router.post("/newspost", checkAuth, async (req, res) => {
  try {
    const {
      userId,
      headline,
      description,
      location,
      category,
      language,
      status
    } = req.body;
    if (!userId) {
      res.json({
        message: "user is not defined",
      });
    }

      if (!headline || !description) {
        res.json({
          message: "headline or description is not provided.",
        });
      }

      console.log(  userId,
      headline,
      description,
      location,
      category,
      language,
      status)
      const news = new NewsPost({
        userId,
        headline,
        description,
        location,
        category,
        language,
        status,
      });
      const update = await news.save();
      console.log(update);
    
    res.json({
        message:"news added successfully!",
    })
  } catch (err) {
    console.log("error has:",err);
    res.status(500).json({
      message: "something went wrong!!",
      error: err,
    });
  }
});

Router.post('/upload', upload.single('media'), async (req, res) => {
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
