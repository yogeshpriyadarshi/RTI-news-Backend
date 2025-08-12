// external package
const express = require("express");
const cors = require("cors");

const app = express();
// All routes of first version.
const v1Routes = require("./routes/v1/index");

// db connection
const connectDB = require('./config/configMongoDB');
const errorHandler = require("./middleware/centralErrorHandler");
const rateLimit = require('express-rate-limit');
const { default: helmet } = require("helmet");
const compression = require("compression");
// app intialize
//cros origin resource sharing
app.use(cors({
  origin:"*"
}));
app.use(express.json());  

app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api/v1', limiter);
app.use(compression());

app.use("/api/v1",v1Routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

connectDB();
module.exports = app;



