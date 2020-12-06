chrome.devtools.panels.create("Network Spy",
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
    if(!encoding && requestCompletedDetails.request.url === 'https://api.dev.lifedata.ai/v1/graphql' && requestCompletedDetails.request.postData){
      let parsedJson = {};
      try{
          parsedJson = JSON.parse(content);
      }catch(err){
        console.log('Not an JSON')
      }
      chrome.runtime.sendMessage({
        content,
        post: JSON.parse(requestCompletedDetails.request.postData.text)
       });
    }
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