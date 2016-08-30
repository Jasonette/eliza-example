// Load Jason View
var view = require('./jason.json');

// Load Eliza engine
var ElizaBot = require('./elizabot.js')
var eliza = new ElizaBot
eliza.memSize = 1024

// Populate with first message from Eliza
var messages = [{text: eliza.getInitial()}];

// Start Express server
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.json(view);
});
app.get('/messages', function(req, res){
  res.json({messages: messages});
});
app.post('/messages', function(req,res){
  var line = req.body.text.trim();
  if (line) {
    messages.push({text: line});
    messages.push({text: eliza.transform(line)});
  }
  res.json({messages: messages});
});
app.listen(process.env.PORT || 3000);
