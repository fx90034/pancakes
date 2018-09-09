var express = require('express');
var cors = require('cors');
var request = require('request')

var app = express();
app.use(cors());

app.get('/api/:url', function(req, res){
  request('https://stackoverflow.com/questions/'+req.params.url, function (error, response, body) {
    console.log(req.params.url);
    if (!error && response.statusCode === 200) {
      console.log(body);
      res.send(body);
    }
   });
});

app.listen(5000);
