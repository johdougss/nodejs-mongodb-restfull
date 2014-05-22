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
	require('./routes/users').routes(app, db, config);
})

var listen = app.listen(config.server.port);
// var addr = app.listen(config.server.port).address();
// console.log('app listening on http://' + addr.address + ':' + addr.port);
// var open = require('open');
// open('http://'+ addr.address + ':' + addr.port);


// var db = mongo.db(config.db.uri, {native_parser:true});
// app.use(function(req,res,next){
// 	req.db = db;
// 	next();
// });


// var MONGOHQ_URL = 'mongodb://admin:admin@oceanic.mongohq.com:10046/vendaconvite';
// var MONGOLOCAL_URL = 'mongodb://localhost/vendaconvite';

// // var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
// var mongoUri = MONGOHQ_URL || MONGOLOCAL_URL;
// console.log('connect mongoUri: '+ mongoUri);

// mongo.Db.connect(mongoUri, function (err, db) {
// 	db.collection('mydocs', function(er, collection) {
// 		collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
// 		});
// 	});
// });


// MongoClient.connect(mongoUri, function(err, db) {
//   // operate on the collection named "test"
//   var collection = db.collection('test')

//   // remove all records in collection (if any)
//   console.log('removing documents...')
//   collection.remove(function(err, result) {
//   	if (err) {
//   		return console.error(err)
//   	}
//   	console.log('collection cleared!')
//     // insert two documents
//     console.log('inserting new documents...')
//     collection.insert([{name: 'tester'}, {name: 'coder'}], function(err,
//     	docs) {
//     	if (err) {
//     		return console.error(err)
//     	}
//     	console.log('just inserted ', docs.length, ' new documents!')
//     	collection.find({}).toArray(function(err, docs) {
//     		if (err) {
//     			return console.error(err)
//     		}
//     		docs.forEach(function(doc) {
//     			console.log('found document: ', doc)
//     		})
//     	})
//     })
//   })
// })

// app.use('/users2', users);



// require('./lib/routes/appFile').addRoutes(app, config);

// app.get('/users', function(req,res){
// 	MongoClient.connect(config.db.uri, function(err, db) {
// 	  var collection = db.collection('users')
// 	  collection.find({}).toArray(function(err, docs) {
// 	  	res.json(docs)
// 	  })
// 	})
// })

// app.use(express.static(__dirname + '/public'))

