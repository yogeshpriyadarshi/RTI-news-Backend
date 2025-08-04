const express = require("express");
const NotifcationToken = require("../models/notificationToken");
const admin = require("firebase-admin");

const Router = express.Router();

Router.post("/savetoken",async(req, res )=>{
    const { userId, token, platform } = req.body;
  try {
     const update=await NotifcationToken.findOneAndUpdate(
  { userId }, 
  { token }, 
  {platform},
  { upsert: true, new: true }
);
    res.status(200).send("Token saved");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving token");
  }
})

Router.post("/send-notification", async (req, res) => {
  const { title, body } = req.body;

  try {
    const allTokens = await NotifcationToken.find({});
    const tokens = allTokens.map((t) => t.token);

    if (!tokens.length) return res.send("No tokens to send");

    const message = {
      notification: { title, body },
      tokens,
    };

    const response = await admin.messaging().sendMulticast(message);

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





Router.post("/send-notification", async (req, res) => {
  const { tokens, title, body } = req.body;

  const message = {
    notification: { title, body },
    tokens, // array of FCM tokens (up to 500)
  };

  try {
    const response = await admin.messaging().sendMulticast(message);

    // Optionally: remove failed tokens from DB
    const failedTokens = [];
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        failedTokens.push(tokens[idx]);
      }
    });

    res.status(200).json({
      successCount: response.successCount,
      failureCount: response.failureCount,
      failedTokens,
    });
  } catch (error) {
    console.error("Error sending notification", error);
    res.status(500).send("Error sending notification");
  }
});

module.exports= Router;