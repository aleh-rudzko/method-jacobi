var express = require('express');
var router = express.Router();
var Busboy = require('busboy');


var client = require('../client');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KURSACHE', data:{} });
});

var fs = require('fs');
var busboy = require('connect-busboy');
//...
router.post('/', function(req, res, next) {
    let busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        client(data, function(result) {
          console.log('Done parsing form!');
          res.setHeader('Connection', 'close');
          res.render('index', {title: 'Hey', result, data});
        })
        
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    req.pipe(busboy);
});

module.exports = router;
