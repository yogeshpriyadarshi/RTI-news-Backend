const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { default: axios } = require("axios");

const Router = express.Router();

Router.get("/news",checkAuth,async(req, res)=>{
    try{
        const key=process.env.NEWS_THIRD_PARTY;
    const news = await axios.get(`https://newsdata.io/api/1/latest`,
        {params:{
            apikey:key,
            country: 'in',
            language: req.query.lang || 'en'

        }});
    console.log(" news form third api", news.data);
    res.send(news.data);
    }catch(err){
        console.error(err);
        res.send(err);

    }
   
});


module.exports =Router;