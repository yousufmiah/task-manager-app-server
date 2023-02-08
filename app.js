//basic library import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

//security middleware library import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Database library import
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

//security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

//bodyParser implement
app.use(bodyParser.json()); //bodyParser er vitore json kaj korchi tai

//request rate limit
//15 minite 3000 request aste parbe tar basi na
const limiter = rateLimit({ windows: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

//Mongo DB Database connection
//localhost connection
const URI = "mongodb://localhost:27017/Todo";
//localhost user password nai, tai faka
const OPTION = { user: "", pass: "", autoIndex: true };

mongoose.connect(URI, OPTION, (error) => {
  console.log("Connection Success");
  console.log(error);
});

//routing implement
app.use("/api/v1/", router);

//undefined route implement
//*mane sob route
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

module.exports = app;
//index.js import korbo
