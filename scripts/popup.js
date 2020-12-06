


chrome.storage.onChanged.addListener(function(changes, namespace) {
    document.getElementById('tabeldata').append = changes.table.newValue.map((val)=>{
        if(val.post){
        return `
        <tr>
    <td>${val.post.operationName}</td>
    <td>${val.content}</td>
  </tr>
        
        `;
            
        }
    });
  });


  var backgroundPageConnection = chrome.runtime.connect({
    name: "popup-page"
  });
  
  backgroundPageConnection.onMessage.addListener(function (message) {
    chrome.storage.local.get('table', function(result) {
        console.log(result)
        let temp = result.table;
        if(!temp) temp= [];
        chrome.storage.local.set({table: [...temp, message]}, ()=> {
            // console.log('Value is set to ' + value);
          });

      });
        
  
  });
  
  chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "pannel.js"
  });