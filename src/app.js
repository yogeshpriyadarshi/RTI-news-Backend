// external package
const express = require("express");
const cors = require("cors");

const app = express();

const v1Routes = require("./routes/v1/index");

// db connection
const connectDB = require('./config/configMongoDB');
// app intialize
//cros origin resource sharing
app.use(cors({
  origin:"*"
}));
app.use(express.json());  

app.use("/api/v1",v1Routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

connectDB();
module.exports = app;



