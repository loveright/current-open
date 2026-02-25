const statusEl = document.getElementById("status");
const installBtn = document.getElementById("installBtn");

chrome.runtime.sendMessage({ type: "CHECK_NATIVE" }, (response) => {
    if (!response || !response.connected) {
        statusEl.textContent = "🔴 Native Host Not Installed";
        statusEl.classList.add("disconnected");

        installBtn.style.display = "block";

    } else {
        statusEl.textContent = "🟢 Native Host Connected";
        statusEl.classList.add("connected");
    }
});

installBtn.onclick = () => {
    chrome.tabs.create({
        url: "https://github.com/loveright/current-open/releases/latest"
    });
};
document.getElementById("store").onclick = () => {
    chrome.tabs.create({
        url: `https://chromewebstore.google.com/detail/${chrome.runtime.id}`
    });
};

document.getElementById("github").onclick = () => {
    chrome.tabs.create({
        url: "https://github.com/loveright/current-open"
    });
};

document.getElementById("support").onclick = () => {
    chrome.tabs.create({
        url: "https://paypal.me/moyuyue"
    });
};