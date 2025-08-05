require('dotenv').config();

 const app = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log('Server started at http://localhost:3000');
});



