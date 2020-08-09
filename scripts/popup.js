let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {

    const config = {
      mode: 'direct',
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
  };