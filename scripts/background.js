chrome.webRequest.onBeforeRequest.addListener(
  function(details,) { 
    var postedString = decodeURIComponent(String.fromCharCode.apply(null,
      new Uint8Array(details.requestBody.raw[0].bytes)));
    console.log(JSON.parse(postedString)); 
  },
  {urls: ["https://api.dev.lifedata.ai/v1/graphql"]},
  ["requestBody"]);