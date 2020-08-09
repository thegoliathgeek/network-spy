let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {

    const config = {
      mode: 'fixed_servers',
      rules: {
        proxyForHttps:{
          scheme: 'https',
          host: '103.28.118.50'
        },
        bypassList: ['github.com']
      }
    }
    chrome.proxy.settings.set(
      {value: config, scope: 'regular'},
      function() {console.log('Proxy set')});

      chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {console.log(JSON.stringify(config));});
    // let color = element.target.value;
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.executeScript(
    //       tabs[0].id,
    //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
    // });
  };