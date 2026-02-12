let lastTs = 0;
document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    console.log("click", Date.now());
    if (!a) return;

    if (!a.href.startsWith("https://current-opener/open")) return;

    const now = Date.now();
    if (now - lastTs < 300) return;
    lastTs = now;

    e.preventDefault(); // 阻止真的跳转
    e.stopPropagation();
    e.stopImmediatePropagation();

    const url = new URL(a.href);
    const type = url.searchParams.get("type");
    const path = url.searchParams.get("path");

    // IDE 继续走 native messaging
    if (["idea", "webstorm", "goland"].includes(type)) {
        chrome.runtime.sendMessage({
            type: `OPEN_${type.toUpperCase()}`,
            path
        });
        return;
    }

    // 文件 / 文件夹 → 升级为自定义协议
    if (type === "file" || type === "folder") {
        const protocolUrl =
            `current-opener://open?type=${type}&path=${encodeURIComponent(path)}`;

        window.location.href = protocolUrl;
    }
});

