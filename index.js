// content of index.js

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
const assert = require('assert');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/client'));
app.set('port', process.env.PORT || 3000);


var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
}); 
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var url = "mongodb+srv://godfreb:myPassword@cluster0-ccbeh.mongodb.net/test?retryWrites=true";
const dbName = 'myproject';


const mongoose = require('mongoose');
mongoose.connect(url);

var Schema = mongoose.Schema;

var buttonSchema = new Schema({
  name:  String,
  presses: Number
});

var Button = mongoose.model('Button', buttonSchema);




app.post('/buttonPressed', function(req, res) {
    console.log(req.body);

    Button.findOneAndUpdate({name: req.body.name}, {$inc:{presses:"1"}}, { new: true }, function(err, doc){
      if(err){
          console.log("Something wrong when updating data!");
      }
      if (!doc){
        console.log("creating new button...")
        const but = new Button({name: req.body.name, presses: 1});
        but.save().then(() => console.log("created: " + req.body.name));
      }
      console.log(doc);
    });

    var returnObj = {};
    res.end();
});

// MongoClient.connect(url, {useNewUrlParser: true }, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   insertDocuments(db, function() {
//     updateDocument(db, function() {
//       client.close();
//     });
//   });
// });



// const stitch = require("mongodb-stitch")
// const clientPromise = stitch.StitchClientFactory.create('model-selector-cyntv');
// clientPromise.then(client => {
//   const db = client.service('mongodb', 'mongodb-atlas').db('ModelSelections');
//   client.login().then(() =>
//     db.collection('Models').updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
//   ).then(() =>
//     db.collection('Models').find({owner_id: client.authedId()}).limit(100).execute()
//   ).then(docs => {
//     console.log("Found docs", docs)
//     console.log("[MongoDB Stitch] Connected to Stitch")
//   }).catch(err => {
//     console.error(err)
//   });
// });
