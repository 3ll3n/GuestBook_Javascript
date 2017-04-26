var Guestbook = require('./views/guestbook');

var App = function() {

  var guestbook = new Guestbook();
  guestbook.viewAllEntries();

}

window.onload = App;
