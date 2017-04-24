var Entries = require('../models/entries');

var Guestbook = function() {

}

Guestbook.prototype = {
  render: function(entries) {
    var container = document.getElementById("all-entries");
    for(var entry of entries) {
      var divContainer = document.createElement("div");
      divContainer.setAttribute("class", "entry-container");
      
      var contentDiv = document.createElement("div");
      contentDiv.setAttribute("class", "entry-list");

      var divImage = document.createElement("img");
      divImage.src = '../' + entry.image;

      var divMessage = document.createElement("div");
      divMessage.innerHTML = "<p>" + entry.message + "</p>";
      divMessage.setAttribute("class", "entry-message"); 

      var button = document.createElement("button");
      button.type = "submit";
      button.innerText = "Delete entry";

      contentDiv.appendChild(divImage);
      contentDiv.appendChild(divMessage);
      contentDiv.appendChild(button);
      divContainer.appendChild(contentDiv);
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


