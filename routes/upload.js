var express = require('express');
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


// router.post('/images', multer.array('image'), (req, res, next) => {
//   if (!req.files) {
//     res.status(400).send('No files uploaded.');
//     return;
//   }
//   console.log(req.files.length);
//   res.send('All Files Recieved');
// });
