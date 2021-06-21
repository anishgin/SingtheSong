let MongoClient = require('mongodb').MongoClient;
url = "mongodb+srv://antrildb:antrildb@antrilmangocluster.pr4r1.mongodb.net/test?authSource=admin&replicaSet=atlas-dh0a4h-shard-0&readPreference=primary&ssl=true" ;
dbname = "antdb";
collection_name = "RCSONGS";

var song_result

const client = new MongoClient(url);

async function getAllSongs() {
  MongoClient.connect(url, {useUnifiedTopology: true} , function(err, client){

    if(err) throw err;

    let db = client.db(dbname);
    db.collection(collection_name).find().toArray(function(err, result){
      if(err) throw err;
      //console.log(result);
      song_result = result;
      client.close();
      });
  });
  return song_result; 
};

async function main() {
  let client, db;
  try{
     client = await MongoClient.connect(url, {useNewUrlParser: true});
     db = client.db(dbname);
     let dCollection = db.collection(collection_name);
     let result = await dCollection.find();   
     // let result = await dCollection.countDocuments();
     // your other codes ....
     console.log("Main resilrt "+result);
     return result;
  }
  catch(err){ console.error(err); } // catch any mongo error here
  finally{ client.close(); } // make sure to close your connection after
 }

 async function doIt() {
  try {
      const res = await main();
      song_result = res;
      console.log(">doIt > Records: " + res.length);
  } catch (error) {
      console.log(error);
  }
  console.log("doIt >Done!");
  console.log("Inside doIt>>> Song result Out" + song_result)
}



var employeeApp = angular.module("SearchApp",[]);
  employeeApp.controller("songCtrl",function($scope){
    $scope.query = {}
    $scope.queryBy = '$'

    promisea = getAllSongs()
    promisea.then(function(result) {
      console.log("Promising result "+result)
      song_result = result;
   //   //JSON.stringify(result)
      console.log("Inside Querier > Song Result > songlist" + $scope.songlist)
  });
    
  $scope.orderProp="songno";                
});

    //console.log("Song result Out" + song_result)
    //$scope.songlist = song_result
    
    //console.log("Inside Querier > Song Result > songlist" + $scope.songlist)
    /*
    [
      {
        "book": "Thiruvalipaatu paadalgal",
        "category": "varugai",
        "songno": "5",
        "title": "Akkini Abishegam Inthidum"
      },
      {
        "book": "Thiruvalipaatu paadalgal",
        "category": "varugai",
        "songno": "112",
        "title": "Akkini Abishegam Inthidum"
      },
      {
        "book": "Thiruvalipaatu paadalgal",
        "category": "varugai",
        "songno": "19",
        "title": "Akkini Abishegam Inthidum"
      },
      {
        "book": "Thiruvalipaatu paadalgal",
        "category": "varugai",
        "songno": "23",
        "title": "Akkini Abishegam Inthidum"
      },
      {
        "book": "Thiruvalipaatu paadalgal",
        "category": "varugai",
        "songno": "41",
        "title": "Akkini Abishegam Inthidum"
      }
    ];
    */
   //