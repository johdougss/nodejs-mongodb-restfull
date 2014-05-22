require('express-namespace');
var express = require('express');
var router = express.Router();
var app = express();

var config = require('./config');

var mongo = require('mongodb');
var db = mongo.MongoClient;

app.all('/*', function(req, res, next) {
  // res.setHeader('Content-Type','application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
  next();
});

app.get('/', function(req,res) {
	res.send('Hello World!')
})
app.namespace('/api', function(){
	app.get('/', function(req,res) {
		res.send('api rest full')
	})
	var dbUri = config.db.uri;
	require('./routes/persons').routes(app, db, dbUri);
})

app.use(express.static(__dirname + '/public'))
app.listen(config.server.port);


