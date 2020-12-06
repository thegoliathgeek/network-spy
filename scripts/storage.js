const SetSyncData = ({key, body})=>{
    chrome.storage.sync.set({[key]: body}, function() {
        console.log('Value is set to ' + value);
      });
    
}

const SetLocalData = ({key, body})=>{
    chrome.storage.local.set({[key]: body}, function() {
        console.log('Value is set to ' + value);
      });
}

const GetSyncData = (key)=>{
    chrome.storage.sync.get(key, function(result) {
        console.log('Value currently is ' + result);
      });
    
};