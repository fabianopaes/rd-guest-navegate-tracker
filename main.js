var userNavegateManager = {};
var KEY = "guest";
var URL = "https://rd-leads-rest-api.herokuapp.com/v1/leads/contacts";

//function to handle when guest access the page
userNavegateManager.onLoad = function () {
 var guest = storage.get(KEY);

 if (guest && guest.email) {
   guest.pages = getCurrentPage();
   storage.set(KEY, guest);
   postLead(guest);
   return;
 }
 //it will mind if we already know the guest, if so... just storage the page
 if (guest) {
   storage.addPage(KEY, guest, getCurrentPage());
   return;
 }
 storage.set(KEY, storage.start());
}

//function to handle when guest leave the page, so we can get avg time that he kept on the page
userNavegateManager.onExit = function () {
 var data = storage.get(KEY);
 if (data) {
   var lastPage = data.pages[data.pages.length - 1];
   data.pages[data.pages.length - 1] = lastPage;
   storage.set(KEY, data);
 }
}

var getCurrentPage = function () {
 return { "url": window.location.pathname, "accessTimestamp": Date.now() };
}

var storage = {};

storage.set = function (key, value) {
 localStorage.setItem(key, JSON.stringify(value));
}

storage.get = function (key) {
 return JSON.parse(localStorage.getItem(key));
}

storage.start = function () {
 return {
   "email": null,
   "pages": [getCurrentPage()]
 }
}

storage.addPage = function (key, data, page) {
 data.pages.push(page);
 storage.set(key, data)
}

/*
Catching the click on the button and submit it
*/
var onClickListener = function (event) {
 event.preventDefault();
 var email = document.getElementById("email").value;
 submit(email);
}

var submit = function (email) {
 var data = storage.get(KEY);
 data.email = email;
 storage.set(KEY, data);
 postLead(data);
}

var postLead = function (params) {
 var http = new XMLHttpRequest();
 http.onreadystatechange = responseServer;
 http.open('POST', URL, true);
 http.setRequestHeader('Content-Type', 'application/json');
 http.withCredentials = true;
 http.send(params);
}


var responseServer = function () {
 if (this.readyState === 4 && this.status == 200) {
   console.log('Response the server: ', this.response);
 }
};

//Starting listenning every single page load
window.addEventListener("load", userNavegateManager.onLoad);

//Starting listenning every single page leave
window.addEventListener("beforeunload", userNavegateManager.onExit);

//Starting listenning page submit
window.addEventListener("submit", onClickListener);