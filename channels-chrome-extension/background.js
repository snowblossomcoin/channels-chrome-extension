const default_config = {
    "endpoint_address": "localhost",
    "endpoint_port": 9090
};

const captured_domain = "example.com";

function init_config() {
    chrome.storage.local.set(default_config);
}

function add_icon_rules() {
    chrome.declarativeContent.onPageChanged.addRules([
        {
            conditions: [new chrome.declarativeContent.PageStateMatcher({pageUrl: {hostContains: captured_domain}})],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }
    ]);
}

function add_proxy_rules() {
    chrome.storage.local.get(
        ["endpoint_address", "endpoint_port"],
        function(result) {
            let proxy_config = {
                mode: "pac_script",
                pacScript: {
                    mandatory: false,
                    data:
`
function FindProxyForURL(url, host) {
    if ( shExpMatch(host, "${captured_domain}")) {
        alert("matched");
        return "PROXY ${result.endpoint_address}:${result.endpoint_port}";
    }
    return "DIRECT";
}
`
                }
            };
            chrome.proxy.settings.set( { value: proxy_config } );
        }
    );
}


// on extension installation
chrome.runtime.onInstalled.addListener( function() {
    init_config();
    add_icon_rules();
    add_proxy_rules();
});
