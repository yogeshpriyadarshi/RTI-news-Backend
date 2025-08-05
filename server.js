// external package
require('dotenv').config();

// const express = require("express");
// const app = express();


 const app = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log('Server started at http://localhost:3000');
});



