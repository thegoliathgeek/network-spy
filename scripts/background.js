// chrome.webRequest.onBeforeRequest.addListener(
//   function(details,) { 
//     var postedString = decodeURIComponent(String.fromCharCode.apply(null,
//       new Uint8Array(details.requestBody.raw[0].bytes)));
//     // console.log(details); 
//   },
//   {urls: ["https://api.dev.lifedata.ai/v1/graphql"]},
//   ["requestBody"]);


  // chrome.devtools.network.onRequestFinished.addListener(request => {
  //   request.getContent((body) => {
  //     if (request.request && request.request.url) {
  //       console.log(body)
  //       if (request.request.url.includes('<url-to-intercept>')) {
  //         // chrome.runtime.sendMessage({
  //         //     response: body
  //         // });
  //       }
  //     }
  //   });
  // });


  chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    var devToolsListener = function(message, sender, sendResponse) {
        // Inject a content script into the identified tab
        console.log(message)
        // chrome.tabs.executeScript(message.tabId,
        //     { file: message.scriptToInject });
    }
    // add the listener
    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(function() {
         devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});


var openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name == "devtools-page") {
      if (openCount == 0) {
        console.log("DevTools window opening.");
      }
      openCount++;

      port.onDisconnect.addListener(function(port) {
          openCount--;
          if (openCount == 0) {
            console.log("Last DevTools window closing.");
          }
      });
    }
});