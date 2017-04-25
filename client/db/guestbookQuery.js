var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var GuestbookQuery = function() {
  this.url = 'mongodb://localhost:27017/guestbook'; 
};

GuestbookQuery.prototype = {
  all: function(onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      var collection = db.collection('entries');
      collection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
      });
    });
  },
  add: function(messageToAdd, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(db) {
        var collection = db.collection('entries');
        collection.insert(messageToAdd);
        onQueryFinished();
      }
    });
  },
  findById: function(id, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(db) {
        var collection = db.collection('entries');
        collection.find({_id: new ObjectID(id)}).toArray(function(err, docs) {
          onQueryFinished(docs);
        });
      }
    });
  },
  deleteById: function(id, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(db) {
        var collection = db.collection('entries');
        collection.remove({_id: new Object(id)}).toArray(function(err, docs) {
          onQueryFinished(docs);
        });
      }
    });
  }
};


module.exports = GuestbookQuery;