//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up Express App
var app = express();
var PORT = process.env.PORT || 7000;

// Sets up Express app to hand data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Router
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listener
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});