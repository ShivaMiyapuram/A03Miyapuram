var path = require("path");
var express = require("express");
var logger = require("morgan");

var bodyParser = require("body-parser"); // simplifies access to request body

var client = require('twilio')('AC762f1aba1f79a720019db59b2a18c2cf','4db07f0b7ae5f2803cbc4cb2c8a78127');

var app = express();  // make express app

app.use(bodyParser.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.static('assets'));
// 1 set up the view engine
app.set('view engine', 'ejs');


var entries = [];
app.locals.entries = entries; // now entries can be accessed in .ejs files

// 3 set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/assets",express.static(__dirname + "/assets"));


// 4 handle http GET requests (default & /new-entry)
app.get("/guestbook", function (request, response) {
  response.render("index");
});

app.get("/index", function (request, response) {
  response.render("index");
});


app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});
// 5 handle an http POST request to the new-entry URI 
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("/index");  // where to go next? Let's go to the home page :)
});


app.get("/Home", function (request, response) {
  response.render("Home");
});

app.get("/", function (request, response) {
  response.render("Home");
});


app.get("/Contactpage", function (request, response) {
  response.render("Contactpage");
});

app.get("/Convertorpage", function (request, response) {
  response.render("Convertorpage");
});

app.get('/testtwilio', function(req, res){
  client.sendMessage({
    to: '+16605280444',
    from: '+16605524431',
    body: req.body.username + req.body.comments

}, function(err, data){
    if(err)
    console.log(err);

    console.log(data);
})
});


app.post("/Contact1", function (request, response){
    client.sendMessage({
    to: '+16605280444',
    from: '+16605524431',
    body: request.body.username + request.body.username

}, function(err, data){
    if(err)
    console.log(err);

    console.log(data);
})
});

app.post("/Contact", function (request, response) {
var api_key = 'key-aaf4659e8f7fc837f6ff60a292d84635';
var domain = 'sandbox82b9382222a549a680b4c0dbfb23b5a3.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

console.log("request body: ",request);
 
var data = {
  from: 'Mail Gun<postmaster@sandbox82b9382222a549a680b4c0dbfb23b5a3.mailgun.org>',
  to: 'shivateja219@gmail.com',
  subject: request.body.username,
  text: request.body.comments
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
    if(!error)
        response.send("Mail Sent");
    else
        response.send("Mail not sent");
});
});   
// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404");
});

// Listen for an application request on port 8081 & notify the developer
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
});