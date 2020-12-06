var connections = {};

chrome.runtime.onConnect.addListener(function (port) {

  connections = {...connections, [port.name]: port}

    var extensionListener = function (message, sender, sendResponse) {
        console.log(message, sender, sendResponse)
        if (message.name == "init") {
          connections[message.tabId] = port;
          return;
        }

    }

    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]]
            break;
          }
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log(request)
  connections['popup-page'].postMessage(request);
    return true;
});


chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log(changes);
});
