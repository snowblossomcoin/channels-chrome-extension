
'use strict';


if (!localStorage.firstime)
{
  localStorage.host='localhost';
  localStorage.port=1080;
  localStorage.enabled=1;

  localStorage.firsttime = 1;
}

localStorage.enabled=1;

loadProxy();

function loadProxy() {

  console.log("Loading");
  console.log(localStorage);

  var config_socks = {
    mode: "fixed_servers",
    rules: {
      proxyForHttp: {
        scheme: "socks5",
        host: localStorage.host,
        port: parseInt(localStorage.port)
      },
    }
  };

  var config_disable = {
    mode: "system",
  };


  var icon = {
    path: "icons/flower-on-128.png"
  }

  if (parseInt(localStorage.enabled)==1)
  {
    console.log(JSON.stringify(config_socks));
    chrome.proxy.settings.set(
      {value: config_socks, scope: 'regular'},
      function() {});
  }
  else
  {
    console.log("Disabling proxy");
    chrome.proxy.settings.set(
      {value: config_disable, scope: 'regular'},
      function() {});
    icon["path"] = "icons/flower-off-128.png";
  }

  chrome.proxy.settings.get(
    {'incognito': false},
    function(config2) {console.log(JSON.stringify(config2));});
  console.log(icon);

  chrome.browserAction.setIcon(icon);
}

