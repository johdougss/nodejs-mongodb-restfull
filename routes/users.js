
exports.routes = function(app, dbclient, dbUri) {
    var ObjectID = require('mongodb').ObjectID;

    var collection_name = 'users';
    app.namespace('/'+collection_name, function(){
        app.get('/',function(req,res){
            dbclient.connect(dbUri, function(err, db) {
                var collection = db.collection(collection_name);
                collection.find({}).toArray(function(err, docs) {
                    res.json(docs)n
                })
            })
        })
        app.post('/', function(req, res) {
            dbclient.connect(dbUri, function(err, db) {
                var docNew = {name: 'addnew'};
                var collection = db.collection(collection_name);
                collection.insert(docNew, function(err, doc) {
                    res.json(doc);
                })
            })
        })
        app.get('/:id', function(req, res) {
            var id = req.params.id;
            dbclient.connect(dbUri, function(err, db) {
                var collection = db.collection(collection_name);
                var query = {"_id": new ObjectID(id)};
                collection.findOne(query, function(err, doc){
                    res.json(doc)
                })
            })
        })
        app.delete('/:id', function(req, res) {
            var id = req.params.id;
            dbclient.connect(dbUri, function(err, db) {
                var collection = db.collection(collection_name);
                var query = {"_id": new ObjectID(id)};
                collection.remove(query, function(err, result){
                  var responseJson = result==1? {msg:'sucess'}: {msg:'error: '+err};  
                  res.json(responseJson);  
              })
            })
        })
        app.put('/:id', function(req, res) {
            var id = req.params.id;
            dbclient.connect(dbUri, function(err, db) {

                var collection = db.collection(collection_name);
                var query = {"_id": new ObjectID(id)};
                var docNew = {name: 'novonome'};
                var options  = {upsert:true, w: 1};
                var sort = [['_id','asc']];

                //not return object updated
                // collection.update(query, docNew, options, function(err, result) {
                //     var responseJson = result==1? {msg:'sucess'}: {msg:'error: '+err};  
                //     res.json(responseJson);
                // })
                //return object updated
                collection.findAndModify(query, sort, docNew, options, function(err, object) {
                  res.json(object);
                  // if (err) console.warn(err.message);
                  // else console.dir(object);  // undefined if no matching object exists.
                });
            })
        })

})


};