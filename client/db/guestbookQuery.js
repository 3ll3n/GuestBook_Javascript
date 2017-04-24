var MongoClient = require('mongodb').MongoClient;

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
  }
};


module.exports = GuestbookQuery;