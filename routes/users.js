// var express = require('express');
// var config = require('../config');
// var router = express.Router();

// // var dbUri = config.db.uri;
// /*
//  * GET userlist.
//  */
//  console.log('router.get(list)'); 
//  router.get('/list', function(req, res) {
//     MongoClient.connect(config.db.uri, function(err, db) {
//       var collection = db.collection('users')
//       collection.find({}).toArray(function(err, docs) {
//         res.json(docs)
//     })
//   })
// });

// /*
//  * POST to adduser.
//  */
// // router.post('/adduser', function(req, res) {
// //     var db = req.db;
// //     db.collection('userlist').insert(req.body, function(err, result){
// //         res.send(
// //             (err === null) ? { msg: '' } : { msg: err }
// //         );
// //     });
// // });

// /*
//  * DELETE to deleteuser.
//  */
// // router.delete('/deleteuser/:id', function(req, res) {
// //     var db = req.db;
// //     var userToDelete = req.params.id;
// //     db.collection('userlist').removeById(userToDelete, function(err, result) {
// //         res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
// //     });
// // });

// module.exports = router;

// var express = require('express');
// var config = require('../config');
// var router = express.Router();


exports.routes = function(app, dbclient, dbUri) {
    var ObjectID = require('mongodb').ObjectID;

    var collection_name = 'users';
    app.namespace('/'+collection_name, function(){
        app.get('/',function(req,res){
            dbclient.connect(dbUri, function(err, db) {
                var collection = db.collection(collection_name);
                collection.find({}).toArray(function(err, docs) {
                    res.json(docs)
                })
            })
        })
        app.get('/:id', function(req, res) {
            var doc_id = req.params.id;
            dbclient.connect(dbUri, function(err, db) {
                var collection = db.collection(collection_name);
                collection.findOne({_id: new ObjectID(doc_id)}, function(err, doc){
                    res.json(doc)
                })
            })
        })
        app.delete('/:id', function(req, res) {
            var doc_id = req.params.id;
            dbclient.connect(dbUri, function(err, db) {
                var collection = db.collection(collection_name);
                collection.remove({_id: new ObjectID(doc_id)}, function(err, result){
                  var responseJson = result==1? {msg:'sucess'}: {msg:'error: '+err};  
                  res.json(responseJson);  
              })
            })
        })
        app.put('/:id', function(req, res) {
            var doc_id = req.params.id;
            dbclient.connect(dbUri, function(err, db) {
                var doc = {_id:doc_id, a:1};

                var collection = db.collection(collection_name);
                collection.update({"_id":id}, doc, {upsert:true, w: 1}, function(err, result) {
                    var responseJson = result==1? {msg:'sucess'}: {msg:'error: '+err};  
                    res.json(responseJson);  
                })
            })
        })
    })


};