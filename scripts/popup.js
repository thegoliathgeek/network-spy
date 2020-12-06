


chrome.storage.onChanged.addListener(function(changes, namespace) {

    document.getElementById('tabeldata').innerHTML = ` <tr>
    <th>Request</th>
    <th>Response</th>
  </tr>`;
    document.getElementById('tabeldata').append = changes.table.newValue.forEach((val)=>{
       if(val.post){
        let tbodyRef = document.getElementById('tabeldata').getElementsByTagName('tbody')[0];

        let newRow = tbodyRef.insertRow();

        let requestCell = newRow.insertCell();
        let responseCell = newRow.insertCell();
        let response = document.createTextNode(val.content);
        
        let request = document.createTextNode(val.post.operationName)
        requestCell.appendChild(request);
        responseCell.appendChild(response);
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