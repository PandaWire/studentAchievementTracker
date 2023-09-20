const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
require('dotenv').config()
const connectDB = require("./db");
const app = express();
const postAchievementTracker = require('./routes/api/postAchieverTrackerController/createAchievementTracker');
const fetchAchievementTracker = require('./routes/api/fetchAchieverTrackerController/fetchAchieverTracker');
const port = 4999;

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    next();
  });

app.use(helmet());
app.use(morgan("dev"));

connectDB();

app.use('/api/v1/achievementTracker/post/controller', postAchievementTracker);
app.use('/api/v1/achievementTracker/get/controller', fetchAchievementTracker);

app.listen(port, () => console.log(`API server is listening on port ${port}`));
