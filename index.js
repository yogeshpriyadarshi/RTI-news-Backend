const express = require('express');
require('dotenv').config();
const cors = require("cors");
const authRouter = require("./src/routes/auth");
const masterRouter = require("./src/routes/master");
const profileRouter = require("./src/routes/profile");
const newsPostRouter = require("./src/routes/newsPost");
const newsThirdPartyRouter = require("./src/routes/apiThirdParty");
const notificationRouter = require("./src/routes/notification");
const connectDB = require('./src/config/configMongoDB');

const app = express();

app.use(cors());
app.use(express.json());  

// It is used to parse json body, into javaScript Object

app.use("/", masterRouter);
app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",newsPostRouter);
app.use("/",newsThirdPartyRouter);
app.use("/",notificationRouter)
// save location 
app.post("/location1",async(req, res)=>{
  try{
     const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Invalid location data" });
  }
console.log(latitude,longitude);
  // const location = {
  //   latitude,
  //   longitude,
  //   timestamp: new Date().toISOString(),
  // };

  // locations.push(location);
  // console.log("Location saved:", location);
  res.status(201).json({ message: "Location stored successfully!" });


  }catch(err){
    console.error(err);
  }

})

connectDB();

app.listen(process.env.PORT, () => {
  console.log('Server started at http://localhost:3000');
});



