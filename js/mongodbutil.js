var MongoClient = require( 'mongodb' ).MongoClient;
var _db;
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( "mongodb+srv://antrildb:antrildb@antrilmangocluster.pr4r1.mongodb.net/test?authSource=admin&replicaSet=atlas-dh0a4h-shard-0&readPreference=primary&ssl=true", function( err, client ) {
      _db = client.db("antdb");
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};