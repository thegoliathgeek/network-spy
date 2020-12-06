
document.getElementById('clicker').onclick = ()=>{
    chrome.storage.local.set({some: new Date()/1000}, function() {
    // console.log('Value is set to ' + value);
  });
}

const setHeader  = (val)=>{
  document.getElementById('pannel').innerText = JSON.stringify(val);
}


chrome.storage.onChanged.addListener(function(changes, namespace) {
    // console.log()
    setHeader(changes);
  });


  var backgroundPageConnection = chrome.runtime.connect({
    name: "popup-page"
  });
  
  backgroundPageConnection.onMessage.addListener(function (message) {
  document.getElementById('pannel').innerText = JSON.stringify(message);
  });
  
  chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "pannel.js"
  });