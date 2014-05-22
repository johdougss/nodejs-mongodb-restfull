require('express-namespace');
var express = require('express');
var router = express.Router();
var app = express();

var config = require('./config');

var mongo = require('mongodb');
var db = mongo.MongoClient;


app.get('/', function(req,res) {
	res.send('Hello World!')
})

app.namespace('/api', function(){
	app.get('/', function(req,res) {
		res.send('api rest full')
	})
	var dbUri = config.db.uri;
	require('./routes/users').routes(app, db, dbUri);
})

app.use(express.static(__dirname + '/public'))

app.listen(config.server.port);
// var addr = app.listen(config.server.port).address();
// console.log('app listening on http://' + addr.address + ':' + addr.port);
// var open = require('open');
// open('http://'+ addr.address + ':' + addr.port);


