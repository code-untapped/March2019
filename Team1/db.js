const { MongoClient, ObjectID } = require('mongodb')

let db,
    clientConn,
    msg="";

const url = 'mongodb://localhost:27017';
const dbName = 'codeUntapped';

module.exports = () => {
  return MongoClient
  .connect(url, {
    useNewUrlParser: true
  })
  .then((client) => {
    db = client.db(dbName);
    clientConn = client;
  });
};

module.exports.Alexa = {
create(data, collection) {
     return new Promise(function(resolve, reject){
         db.collection(collection).insertOne(data, { w: 1 }, function(err, docs){
             if (err) {
                 reject(Error("create: Unable to create record in collection: " + collection));
                 clientConn.close();
             } else {
                 console.log(docs);
                 resolve(docs);
                 clientConn.close();
             }
         });
     });
 },

 all(query, collection) {
        return new Promise(function(resolve, reject){
            db.collection(collection)
            .find(query)
            .sort({ name : 1})
            .toArray()
            .then( function(docs) {
                resolve(docs);
                clientConn.close();
            }, function(error) {
                reject(error);
                clientConn.close();
            });
          });
        }
}
