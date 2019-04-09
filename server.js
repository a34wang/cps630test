var express = require("express");
var app = express(); //require express
var port = 8080 || process.env.PORT;
var mongoose = require("mongoose");
var db = mongoose.connection;
var bodyParser = require("body-parser");
var router = express.Router();
var appRoutes = require("./app/routes/api")(router);
var path = require("path");
var session = require("express-session");
var cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

app.use("/api", appRoutes); //set a /api route
app.use(express.static(__dirname + "/public"));

/*
app.post('/news', function (req, res) {
  res.send(req.session.user);
}) */

var connectionString =
  "mongodb+srv://ambrosek:oRVSzAjpaT0VKFYG@cluster0-foe98.azure.mongodb.net/userBase?retryWrites=true";

mongoose.connect(connectionString, { useNewUrlParser: true }); // connect to default local database

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log(" we're connected to data base!");
});

/*
app.get('/news', function(req,res) {
  console.log("blah    :" + req.session.user);
  res.send(req.session.user);
  //res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
}); */

/*
app.get("/main", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/app/views/index2.html"));
}); */

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});



//start server
app.listen(port, function() {
  console.log("Server listening at port :" + port);
});
