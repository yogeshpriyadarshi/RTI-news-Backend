const express = require('express');
require('dotenv').config();
const cors = require("cors");
const authRouter = require("./src/routes/auth");
const masterRouter = require("./src/routes/master");
const profileRouter = require("./src/routes/profile");
const newsPostRouter = require("./src/routes/newsPost");
const newsThirdPartyRouter = require("./src/routes/apiThirdParty");
const connectDB = require('./src/config/configMongoDB');

const app = express();

app.use(cors());
app.use(express.json());   // It is used to parse json body, into javaScript Object

app.use("/", masterRouter);
app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",newsPostRouter);
app.use("/",newsThirdPartyRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log('Server started at http://localhost:3000');
});



