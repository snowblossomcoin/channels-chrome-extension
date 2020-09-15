
'use strict';


console.log("Loading");

var config = {
  mode: "fixed_servers",
  rules: {
    proxyForHttp: {
      scheme: "socks5",
      host: "localhost",
      port: 1080
    },
  }
};
 
console.log(JSON.stringify(config));
chrome.proxy.settings.set(
  {value: config, scope: 'regular'},
  function() {});

chrome.proxy.settings.get(
  {'incognito': false},
  function(config2) {console.log(JSON.stringify(config2));});

