// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var ip = require('ip');
var app = express();
var requestIp = require('request-ip');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));
app.use("/public",express.static(__dirname + "/public"));

//Change Proxy
app.set('trust proxy', true);
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/whoami', function (req, res) {
 /*var host = dns.lookup(req.headers.host, function(err, result) {
    console.log(result);
    return result;
  });*/
  //let host = req.headers.host.split("").indexOf(":");
  //let resu = req.headers.host.split("").slice(0,host).join("");
  //requestIp.getClientIp(req
  res.json({"ipaddress":req.ip,"language":req.headers['accept-language'],"software":req.headers['user-agent']});
});

// listen for requests :)

var listener = app.listen({port : process.env.PORT, host: '0.0.0.0'},process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});