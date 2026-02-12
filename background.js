chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "OPEN_IDEA") {
        chrome.runtime.sendNativeMessage("com.current.native.host", {
            ide: "idea",
            path: msg.path,
        }, (resp) => {
            console.log("native resp:", resp);
        });
    }

    if (msg.type === "OPEN_WEBSTORM") {
        chrome.runtime.sendNativeMessage("com.current.native.host", {
            ide: "webstorm",
            path: msg.path,
        }, (resp) => {
            console.log("native resp:", resp);
        });
    }

    if (msg.type === "OPEN_GOLAND") {
        chrome.runtime.sendNativeMessage("com.current.native.host", {
            ide: "goland",
            path: msg.path,
        }, (resp) => {
            console.log("native resp:", resp);
        });
    }
});
