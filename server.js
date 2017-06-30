var express = require('express')
var app = express();

var port = process.env.PORT || 8874;

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://mbadmin:mbadmin_123@ds061076.mlab.com:61076/mbdb';

var dbRef = undefined;
var Admins = undefined;
var Homechefs = undefined;
var Users = undefined;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to Mongo server");
 
  dbRef = db;
  Admins = dbRef.collection('admins');
  Homechefs = dbRef.collection('homechefs');
  Users = dbRef.collection('users');
  
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!')
});