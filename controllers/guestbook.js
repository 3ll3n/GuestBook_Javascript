// guestbook controller responsible for guestbook views
var express = require('express');
var app = express();
var guestbookRouter = express.Router();
var path = require('path');
var fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
var upload = multer({ storage: storage });

// var Entries = require('../client/src/models/entries')();

var Entry = require('../client/src/models/entry');

var GuestbookQuery = require('./../client/db/guestbookQuery');
var query = new GuestbookQuery();

guestbookRouter.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + './../client/build/getstarted.html'));
});

// create an entry
guestbookRouter.post('/create', upload.single('image'), function(req, res, next) {

  var entry = new Entry({
    message: req.body.message,
    image: req.file.filename
  });
  query.add(entry, function() {
    res.redirect('/guestbook/viewall');
  });
});

guestbookRouter.get('/viewall', function(req, res) {
  res.sendFile(path.join(__dirname + './../client/build/viewall.html'));
});

guestbookRouter.get('/entries', function(req, res) {
  query.all(function(results) {
    res.json(results);
  });
});

// get by id

guestbookRouter.get('/entries/:id', function(req, res) {
  query.findById(req.params.id, function(results) {
    res.json(results);
  });
});

 // delete by id

 guestbookRouter.delete('/entries/:id', function(req,res) {
  query.deleteById(req.params.id, function(results) {
    res.json(results);
  });
});

// delete all


module.exports = guestbookRouter;