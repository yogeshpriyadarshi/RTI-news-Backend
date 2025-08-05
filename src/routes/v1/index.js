const express = require("express");

const Router = express.Router();

// internal router
 const authRouter = require("./auth");
//const masterRouter = require("./master");
 const profileRouter = require("./profile");
 const newsPostRouter = require("./newsPost");
 const notificationRouter = require("./notification");

// divert all api.
 Router.use("/auth",authRouter);
 Router.use("/profile",profileRouter);
 Router.use("/news",newsPostRouter);
 Router.use("/notification",notificationRouter);


module.exports=Router;