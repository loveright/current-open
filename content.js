let lastTs = 0;

function handleLinkClick(e) {
    // 更全面地查找链接元素
    const el = e.target.closest("[href], [data-href], a");
    if (!el) return;

    // 尝试多种方式获取 href
    const href = el.getAttribute("href") ||
        el.getAttribute("data-href") ||
        el.href ||
        (el.dataset && el.dataset.href);

    if (!href) return;

    // 调试输出（可以在控制台看到）
    console.log("Captured link:", href, "on", window.location.hostname);

    if (!href.startsWith("https://current-opener/open")) return;

    const now = Date.now();
    if (now - lastTs < 300) return;
    lastTs = now;

    // 关键：立即阻止所有默认行为
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const url = new URL(href);
    const type = url.searchParams.get("type");
    const path = url.searchParams.get("path");

    console.log("Opening:", type, path);

    if (["idea", "webstorm", "goland"].includes(type)) {
        chrome.runtime.sendMessage({
            type: `OPEN_${type.toUpperCase()}`,
            path
        });
        return;
    }

    if (type === "file" || type === "folder") {
        const protocolUrl =
            `current-opener://open?type=${type}&path=${encodeURIComponent(path)}`;

        window.location.href = protocolUrl;
    }
}

// 使用捕获阶段拦截点击
document.addEventListener("click", handleLinkClick, true);

// 只对有道云笔记添加 mousedown 监听
if (window.location.hostname === 'note.youdao.com') {
    document.addEventListener("mousedown", handleLinkClick, true);
}

// 移除 target="_blank" 的函数
function removeTargetFromLinks() {
    document.querySelectorAll('a[href^="https://current-opener/open"], a[data-href^="https://current-opener/open"]').forEach(link => {
        if (link.hasAttribute('target')) {
            link.removeAttribute('target');
        }
        // 为有道云笔记的链接添加额外的点击监听
        if (window.location.hostname === 'note.youdao.com' && !link.dataset.listenerAdded) {
            link.addEventListener('click', handleLinkClick, true);
            link.dataset.listenerAdded = 'true';
        }
    });
}

// MutationObserver 监控 DOM 变化
const observer = new MutationObserver(removeTargetFromLinks);

// 等待 DOM 准备好
if (document.body) {
    removeTargetFromLinks();
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        removeTargetFromLinks();
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}