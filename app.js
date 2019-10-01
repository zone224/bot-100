/**
 * Module dependencies.
 */

var express = require("express"),
  routes = require("./routes"),
  http = require("http"),
  path = require("path"),
  fs = require("fs");
var cfenv = require("cfenv");

var chatbot = require("./config/bot.js");

var app = express();

var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var errorHandler = require("errorhandler");

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));
app.use("/style", express.static(path.join(__dirname, "/views/style")));

// =====================================
// WATSON CONVERSATION FOR ANA =========
// =====================================
app.post("/api/watson", (req, res) => {
  processChatMessage(req, res);
}); // End app.post 'api/ana'
function processChatMessage(req, res) {
  chatbot.sendMessage(req, (err, data) => {
    if (err) {
      console.log("Error in sending message: ", err);
      res.status(err.code || 500).json(err);
    } else {
      var context = data.context;
      res.status(200).json(data);
    }
  });
}

app.get("/", (req, res) => {
  res.render("chat.html");
});

http.createServer(app).listen(app.get("port"), "0.0.0.0", () => {
  console.log("Express server listening on port " + app.get("port"));
});
