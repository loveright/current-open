chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
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
    if (msg.type === "CHECK_NATIVE") {
        chrome.runtime.sendNativeMessage(
            "com.current.native.host",
            { ping: true },
            (resp) => {
                if (chrome.runtime.lastError) {
                    sendResponse({ connected: false });
                } else {
                    sendResponse({ connected: true });
                }
            }
        );
        return true;
    }
});
