const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/config').get(process.env.NODE_ENV);
const UserRoute = require('./routes/user')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

app.use('/api', UserRoute);

mongoose.Promise = global.Promise;
mongoose.connect(db.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) console.log(err);
  console.log("database is connected");
});

app.get("/", (req, res) => {
  res.send("working...");
});

app.listen(PORT, (req, res) => {
  console.log("Listening on " + PORT);
});
