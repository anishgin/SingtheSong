import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

//let MongoClient = require('mongodb').MongoClient;
url = "mongodb+srv://antrildb:antrildb@antrilmangocluster.pr4r1.mongodb.net/test?authSource=admin&replicaSet=atlas-dh0a4h-shard-0&readPreference=primary&ssl=true" ;
dbname = "antdb";
collection_name = "RCSONGS";

MongoClient.connect(url, function(err, client){
  if(err) throw err;
  let db = client.db(dbname);
  db.collection(collection_name).find().toArray(function(err, result){
    if(err) throw err;
    console.log(result);
    client.close();
    });
});