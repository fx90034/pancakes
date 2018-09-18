var express = require('express');
var cors = require('cors');
const path = require('path');
var request = require('request');
var cheerio = require('cheerio');

var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/:url', function(req, res){
  request('https://stackoverflow.com/questions/'+req.params.url, function (error, response, body) {
    //console.log(body);
    if (!error && response.statusCode === 200) {
      console.log(req.params.url)
      res.send(body)
    }
   });
});

app.listen(5000);
