var Entries = require('../models/entries');

var Guestbook = function() {

}

Guestbook.prototype = {
  render: function(entries) {
    var container = document.getElementById("all-entries");
    for(var entry of entries) {
      console.log(entry);
      var divContainer = document.createElement("div");
      divContainer.setAttribute("class", "entry-container");

      var image = document.createElement("img");
      image.src = '../' + entry.image;

      var message = document.createElement("p");
      message.innerHTML = entry.message;
      message.setAttribute("class", "entry-message"); 

      var button = document.createElement("button");
      button.innerText = "Delete entry";
      
      button.onclick = function() {
        var request = new XMLHttpRequest();
        request.open("POST", "/guestbook/entries/" + entry._id);
        request.send();
      }

      divContainer.appendChild(image);
      divContainer.appendChild(message);
      divContainer.appendChild(button);
      container.appendChild(divContainer);
    }
  },
  viewAllEntries: function() {
    var entries = new Entries();
    entries.all(this.render);
  }
}

window.onload = function() {
  var guestbook = new Guestbook();
   guestbook.viewAllEntries();
};


