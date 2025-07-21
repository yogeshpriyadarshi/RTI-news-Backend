const express = require("express");
const Languages = require("../models/languages");
const Category = require("../models/categories");
const Location = require("../models/locations");

const Routes = express.Router();

Routes.post("/language",async(req,res)=>{
    try{
        const {language} = req.body;
        const lan = new Languages({language});
        await lan.save();
        res.send(`${language} is added!!!`);
    }catch(err){
        console.error(err);
    }

});


Routes.delete("/language",async(req,res)=>{
    try{
        const {language} = req.body;
        await Languages.deleteOne({language})
    }catch(err){
        console.error(err);
    }

});

Routes.patch("/language",async(req,res)=>{
    try{
        const {language} = req.body;
        await Languages.patch()
        await Languages.deleteOne({language})
    }catch(err){
        console.error(err);
    }

});

Routes.post("/category",async(req, res)=>{
    try{
        const {languageId,category} = req.body;
        const cat = new Category({languageId,category});
        await cat.save();
        res.send(`${category} is added.`);
    }catch(err){
        console.error(err);
        res.send(err);
    }

});

Routes.get("/category",async(req, res)=>{
    try{
        const {languageId} = req.query;
        console.log("language id is ",languageId);
        const cat = await Category.find({languageId});
        console.log(cat);
        res.send({cat});
    }catch(err){
        console.error(err);
        res.send(err);
    }

});

Routes.delete("/category",async(req, res)=>{
    try{
        const {category} = req.body;
        await Category.deleteOne({category});
        res.send("successfully added category!!!");
    }catch(err){
        console.error(err);
        res.send(err);
    }

});


Routes.patch("/category",async(req, res)=>{
    try{
        const {category} = req.body;
        await Category.deleteOne({category});
        res.send("successfully added category!!!");
    }catch(err){
        console.error(err);
        res.send(err);
    }

});

Routes.post("/location",async(req, res)=>{
    try{
        const {location} = req.body;
        const loc = new Location({location});
        await loc.save();
        res.send(`${location} is added.`);
    }catch(err){
        console.error(err);
    }

})

Routes.delete("/location",async(req, res)=>{
    try{
        const {location} = req.body;
        await Location.deleteOne({location});
        res.send("done!");
    }catch(err){
        console.error(err);
    }

})

Routes.patch("/location",async(req, res)=>{
    try{
        const {location} = req.body;
        await Location.deleteOne({location});
        res.send("done!");
    }catch(err){
        console.error(err);
    }

})

module.exports = Routes;