chrome.devtools.panels.create("Network Spy",
"../logos/spy.png",
"../markups/panel.html",
function(panel) {
  chrome.storage.local.set({table: []}, ()=> {
    // console.log('Value is set to ' + value);
  });
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
        // console.log('Not an JSON')
      }
      chrome.runtime.sendMessage({
        content,
        post: JSON.parse(requestCompletedDetails.request.postData.text),
       });
    }
  });
});

