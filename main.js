var ip = require('ip');
var addr = ip.address();

// Jason View
var view = {
  "$jason": {
    "head": {
      "title": "Eliza",
      "actions": {
        "$foreground": {
          "trigger": "reload"
        },
        "$load": {
          "trigger": "reload"
        },
        "reload": {
          "type": "$network.request",
          "options": {
            "url": "http://" + addr + "/message",
            "method": "get"
          },
          "success": {
            "type": "$render"
          }
        },
        "say": {
          "type": "$network.request",
          "options": {
            "method": "post",
            "url": "http://" + addr + "/messages",
            "data": {
              "text": "{{$get.message}}"
            }
          },
          "success": {
            "type": "$render"
          }
        }
      },
      "templates": {
        "body": {
          "style": {
            "border": "none",
            "align": "bottom"
          },
          "sections": [
            {
              "items": {
                "{{#each $jason.messages}}": {
                  "type": "horizontal",
                  "style": {
                    "spacing": "10"
                  },
                  "components": [{
                    "type": "image",
                    "url": "{{avatar}}",
                    "style": {"width": "50", "height": "50", "corner_radius": "3"}
                  },
                  {
                    "type": "label",
                    "style": {
                      "font": "Courier",
                      "size": "12"
                    },
                    "text": "{{text}}"
                  }]
                }
              }
            }
          ],
          "footer":{
            "input": {
              "name": "message",
              "right": {
                "action": {
                  "trigger": "say"
                }
              }
            }
          }
        }
      }
    }
  }
};

// Load Eliza engine
var ElizaBot = require('./elizabot.js');
var eliza = new ElizaBot;
eliza.memSize = 1024;

// Populate with first message from Eliza
var messages = [{ avatar: "https://s3-us-west-2.amazonaws.com/fm.ethan.jason/bot.png", text: eliza.getInitial()}];

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
    messages.push({avatar: "https://s3-us-west-2.amazonaws.com/fm.ethan.jason/jason.png", text: line});
    messages.push({avatar: "https://s3-us-west-2.amazonaws.com/fm.ethan.jason/bot.png", text: eliza.transform(line)});
  }
  res.json({messages: messages});
});
app.listen(process.env.PORT || 3000);
