var express = require('express')
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json({limit:'20mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit:'20mb' , extended: true  }))

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

app.post('/checkusernameindb', function (req, res){

  console.log( '/checkusernameindb' );

  console.log( req.body );
  
  try
  {
    Homechefs.find({"Username": req.body.Username}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      // console.log('Homechefs: ');
      // console.log(docs);

      if( docs.length != 0 )
        res.send( {message:"Username In Use"} );
      else
      {
        Users.find({"Username": req.body.Username}).toArray(function(err, docs) {
          assert.equal(err, null);
          
          // console.log('Users: ');
          // console.log(docs);

          if( docs.length != 0 )
            res.send( {message:"Username In Use"} );
          else
          {
            Admins.find({"Username": req.body.Username}).toArray(function(err, docs) {
              assert.equal(err, null);

              // console.log('Admins: ');
              // console.log(docs);
              
              if( docs.length != 0 )
                res.send( {message:"Username In Use"} );
              else
              {
                // console.log( "Username Available" );
                res.send( {message:"Username Available"} );
              }
            });
          }
        });
      }
    });
    
  }
  catch(e)
  {
    console.log(e);

    res.send( {message:"Username Error"} );
  }
 
});

app.post('/checkemailindb', function (req, res){

  console.log( '/checkemailindb' );

  console.log( req.body );
  
  try
  {
    Homechefs.find({"Email": req.body.Email}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      // console.log('Homechefs: ');
      // console.log(docs);

      if( docs.length != 0 )
        res.send( {message:"Email In Use"} );
      else
      {
        Users.find({"Email": req.body.Email}).toArray(function(err, docs) {
          assert.equal(err, null);
          
          // console.log('Users: ');
          // console.log(docs);

          if( docs.length != 0 )
            res.send( {message:"Email In Use"} );
          else
          {
            Admins.find({"Email": req.body.Email}).toArray(function(err, docs) {
              assert.equal(err, null);

              // console.log('Admins: ');
              // console.log(docs);
              
              if( docs.length != 0 )
                res.send( {message:"Email In Use"} );
              else
              {
                // console.log( "Username Available" );
                res.send( {message:"Email Available"} );
              }
            });
          }
        });
      }
    });
    
  }
  catch(e)
  {
    console.log(e);

    res.send( {message:"Email Error"} );
  }
 
});

app.post('/checkphoneindb', function (req, res){

  console.log( '/checkphoneindb' );

  console.log( req.body );
  
  try
  {
    Homechefs.find({"Phone": req.body.Phone}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      // console.log('Homechefs: ');
      // console.log(docs);

      if( docs.length != 0 )
        res.send( {message:"Phone In Use"} );
      else
      {
        Users.find({"Phone": req.body.Phone}).toArray(function(err, docs) {
          assert.equal(err, null);
          
          // console.log('Users: ');
          // console.log(docs);

          if( docs.length != 0 )
            res.send( {message:"Phone In Use"} );
          else
          {
            Admins.find({"Phone": req.body.Phone}).toArray(function(err, docs) {
              assert.equal(err, null);

              // console.log('Admins: ');
              // console.log(docs);
              
              if( docs.length != 0 )
                res.send( {message:"Phone In Use"} );
              else
              {
                // console.log( "Username Available" );
                res.send( {message:"Phone Available"} );
              }
            });
          }
        });
      }
    });
    
  }
  catch(e)
  {
    console.log(e);

    res.send( {message:"Phone Error"} );
  }
 
});

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!')
});