chrome.devtools.panels.create("James Bond",
"",
"../markups/panel.html",
function(panel) {
 
});


chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
});


chrome.devtools.network.getHAR((details)=>{

});

chrome.devtools.network.onRequestFinished.addListener(function (requestCompletedDetails){
  requestCompletedDetails.getContent(function(content, encoding){
      chrome.runtime.sendMessage({
   content,
   encoding
  });
  });
})


var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
  console.log(message)
});

chrome.runtime.sendMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "content_script.js"
});