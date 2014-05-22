// exports.generic = function(name, app, db, config, methods) {

//  methods = methods || {'GET','POST','PUT','DELETE'};

//  app.get(name, function(req, res) {
//   db.connect(config.db.uri, function(err, db) {
//     var collection = db.collection('users')
//     collection.find({}).toArray(function(err, docs) {
//       res.json(docs)
//     })
//   })
// })
//  app.delete(name+':id', function(req, res) {
//   db.connect(config.db.uri, function(err, db) {
//     var collection = db.collection('users')
//     collection.find({}).toArray(function(err, docs) {
//       res.json(docs)
//     })
//   })
// })
// };


// // var config = {
// //   app: require('express'),
// //   collection: 'users',
// //   db: require('mongodb'),
// //   db_uri: 'mongodb://admin:admin@oceanic.mongohq.com:10046/vendaconvite',
// //   methods: {
// //     'GET':{ active: true, uri: 'usersdelete:id', func: function(err,db){ db.collection(collection)} },

// //   }

// // }
// exports.routes = function(config) {
//     var collection = config.collection,
//         app = config.app,
//         db = config.db,

//         methods = config.methods || {'GET','POST','PUT','DELETE'};

//     var collection = 'users';
//     var uri = '/'+collection;
//     app.get(uri, function(req, res) {
//         db.connect(config.db_uri, function(err, db) {
//           db.collection(collection).find({}).toArray(function(err, docs) {
//             res.json(docs)
//         })
//       })
//     })
//     app.delete(uri + ':id', function(req, res) {
//         var item_id = req.params.id;
//         db.connect(config.db_uri, function(err, db) {
//           db.collection(collection).remove({_id: item_id}, function(err, result){
//               var responseJson = result==1? {msg:'sucess'}: {msg:'error: '+err};  
//               res.json(responseJson);  
//           })
//       })
//     })
// };