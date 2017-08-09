var express = require('express')
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json({limit:'20mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit:'20mb' , extended: true  }))

var port = process.env.PORT || 8874;

var router = express.Router();
const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // file size max 5 mb
  }
});
const Storage = require('@google-cloud/storage');
const storage = Storage({
  projectId: 'ardhaangini-142605',
  keyFilename: './Ardhaangini-ee9e799bd24b.json'
});
const BUCKET_NAME = 'mousebelly-images';
const bucket = storage.bucket(BUCKET_NAME);

router.post('/image', multer.single('image'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  const folderName = 'images';
  const blob = bucket.file(`${folderName}/${req.file.originalname}`);
  const blobStream = blob.createWriteStream({ gzip: true, resumable: false });

  blobStream.on('error', (err) => {
    console.log(err);
    next(err);
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${blob.name}`;
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

module.exports = router;

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

var qs = require('querystring');

app.post('/image', function (req, res){

  console.log( '/image' );

  if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {

            body += data;

            console.log(data);

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {

            // console.log(body);

            var post = qs.parse(body);

            console.log(post);
            console.log(post.kaddu);

            // console.log( post.body.kaddu )
            //console.log( post.kaddu )
            // use post['blah'], etc.
        });
    }


  res.send( {message:"Aloha"} );
  
});

app.post('/image1', function(req, res, next){

  console.log( '/image1' );

  // connect-form adds the req.form object
  // we can (optionally) define onComplete, passing
  // the exception (if any) fields parsed, and files parsed
  req.form.complete(function(err, fields, files){
    if (err) {
      next(err);
    } else {
      console.log('\nuploaded %s to %s'
        ,  files.image.filename
        , files.image.path);
      res.redirect('back');
    }
  });

  // We can add listeners for several form
  // events such as "progress"
  req.form.on('progress', function(bytesReceived, bytesExpected){
    var percent = (bytesReceived / bytesExpected * 100) | 0;
    process.stdout.write('Uploading: %' + percent + '\r');
  });
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