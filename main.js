var userNavegateManager = {};

//function to handle when guest access the page
userNavegateManager.onLoad = function(){
    const key = "guest";
    var guest = storage.get(key);
    //it will mind if we already know the guest, if so... just storage the page
    if(guest){
        storage.addPage(key, guest, getCurrentPage());
        return;
    }
    storage.set(key, storage.start())  ;  
}

//function to handle when guest leave the page, so we can get avg time that he kept on the page
userNavegateManager.onExit = function(){
    const key = "guest";
    var data = storage.get(key);
    if(data){
        var lastPage = data.pages[data.pages.length-1];
        lastPage.leaveTimestamp = new Date();
        data.pages[data.pages.length-1] = lastPage;
        storage.set(key, data);
    }
}

var getCurrentPage = function(){
    return {"url" : window.location.pathname, "accessTimestamp": new Date()};
}

var storage = {};

storage.set = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

storage.get = function(key) {
    return JSON.parse(localStorage.getItem(key));   
}

storage.start = function(){
    return {"timestamp" : new Date(), 
            "contact": null, 
            "pages" : [ getCurrentPage() ]
     }
}

storage.addPage = function(key, data, page) {
    data.pages.push(page);       
    storage.set(key, data)
}



//Starting listenning every single page load
window.addEventListener("load", userNavegateManager.onLoad);

//Starting listenning every single page leave
window.addEventListener("beforeunload", userNavegateManager.onExit);

/*
 Catching the click on the button and submit it
*/
var onClickListener = function(formId, buttonId){
    var email = document.getElementById(formId).innerText;
    console.log(email);
    document.getElementById(buttonId).
        addEventListener("click", submit(email));
}

let submit = function(email){
    console.log("Submitting..." + email);
}


