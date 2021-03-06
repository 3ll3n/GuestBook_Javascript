/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Entries = __webpack_require__(2);

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
      image.setAttribute("class", "img-rounded")

      var message = document.createElement("p");
      message.innerHTML = entry.message;
      message.setAttribute("class", "entry-message"); 

      var button = document.createElement("button");
      button.innerText = "Delete entry";

      button.onclick = (function(){
        var entryId = entry._id;

        return function() {
          var request = new XMLHttpRequest();
          request.open("POST", "/guestbook/entries/" + entryId);
          request.send();
          window.location.reload();
        }
      })();

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

module.exports = Guestbook;




/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Guestbook = __webpack_require__(0);

var App = function() {

  var guestbook = new Guestbook();
  guestbook.viewAllEntries();

}

window.onload = App;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Entry = __webpack_require__(3);

var Entries = function() {

}

Entries.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },
  all: function(callback) {
    this.makeRequest("http://localhost:3000/guestbook/entries", function() {
      if(this.status !==200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);

      var entries = Entries.prototype.populateEntries(results);
        callback(entries);
    });
  },
    populateEntries: function(results) {
      var entries = [];
      results.forEach(function(result) {
        var entry = new Entry(result);
        entries.push(entry);
      });
      return entries;
    },
    makePostRequest: function(url, callback, payload) {
      var request = new XMLHttpRequest();
      request.open("POST", url);
      request.setRequestHeader("Content-type", "application/json");
      request.onload = callback;
      request.send(payload);
    }
};

module.exports = Entries;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Entry = function(options) {
  this._id = options._id;
  this.image = options.image;
  this.message = options.message;
}

module.exports = Entry;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map