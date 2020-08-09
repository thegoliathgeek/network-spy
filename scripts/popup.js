let changeColor = document.getElementById('changeColor');
let directConnection = document.getElementById('removeProxy')
chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });


  directConnection.onclick = function (element) {
     const config = {
       mode: 'direct'
     }
     chrome.proxy.settings.set({value: config, scope: 'regular'}, ()=>{
       console.log('Proxy set to direct connection')
     });
  }
  changeColor.onclick = function(element) {

    const config = {
      mode: 'fixed_servers',
      rules: {
        proxyForHttps:{
          scheme: 'https',
          host: '160.2.38.41'
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