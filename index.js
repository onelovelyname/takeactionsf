var express = require("express");
var mustacheExpress = require("mustache-express");
var EventsController = require("./controllers/EventsController");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());
app.set("view engine", "mustache");
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect CSS bootstrap

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});

app.get("/", function(req, res) {
  res.render("index.mustache", {title: "Hello Melanie"});
});

//app.get("/events/:event_id", EventsController.getFacebookEvents);
app.post("/events/add", EventsController.createEvent);

var db = require("./db.js");