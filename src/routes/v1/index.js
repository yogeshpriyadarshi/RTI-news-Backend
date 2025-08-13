const express = require("express");

const Router = express.Router();

// internal router
 const authRouter = require("./auth");
//const masterRouter = require("./master");
 const profileRouter = require("./profile");
 const newsPostRouter = require("./newsPost");
 const notificationRouter = require("./notification");
  const reporterRouter =require("./reporter");
  const activistRouter = require("./activist");
  const feedbackRouter = require("./newsFeedback");

// divert all api.
 Router.use("/auth",authRouter);
 Router.use("/profile",profileRouter);
 Router.use("/news",newsPostRouter);
 Router.use("/notification",notificationRouter);
 Router.use("/reporter",reporterRouter);
 Router.use("/activist",activistRouter);
 Router.use("/feedback",feedbackRouter);

module.exports=Router;