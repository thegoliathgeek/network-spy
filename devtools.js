chrome.devtools.panels.create("James Bond",
"",
"../markups/panel.html",
function(panel) {
 
});


chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
      console.log(request)
});


// chrome.devtools.inspectedWindow.eval(
//   "jQuery.fn.jquery",
//    function(result, isException) {
//      if (isException)
//        console.log("the page is not using jQuery");
//      else
//        console.log("The page is using jQuery v" + result);
//    }
// );

var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
  console.log(message)
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "content_script.js"
});