// Google Analytics Configuration
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-PT1N37CDQ4');

// Attach safe listeners for inline `onClick` handlers that call
// `subwallet.Helpers.sendEventGa(eventName, url)` so they work without
// requiring 'unsafe-inline' in CSP.
function attachInlineGaHandlers() {
    try {
        var els = document.querySelectorAll('[onclick]');
        // Match sendEventGa('event') or sendEventGa('event', 'url') anywhere in the onclick value
        var re = /subwallet\.Helpers\.sendEventGa\(\s*(['\"])(.*?)\1(?:\s*,\s*(['\"])(.*?)\3)?\s*\)/;
        els.forEach(function (el) {
            var v = el.getAttribute('onclick');
            if (!v) return;
            var m = re.exec(v);
            if (!m) return;
            var eventName = m[2];
            var url = m[4] || undefined;
            // Bind a non-inline click handler that calls the same helper
            el.addEventListener('click', function (e) {
                try {
                    if (window.subwallet && subwallet.Helpers && typeof subwallet.Helpers.sendEventGa === 'function') {
                        if (typeof url === 'undefined') {
                            subwallet.Helpers.sendEventGa(eventName);
                        } else {
                            subwallet.Helpers.sendEventGa(eventName, url);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            });
            // Remove the inline attribute to avoid CSP violations and to signal migration
            // If the onclick contains other unrelated code, we leave it untouched.
            if (v.trim().match(/^subwallet\.Helpers\.sendEventGa\(/)) {
                el.removeAttribute('onclick');
            }
        });
    } catch (err) {
        console.error('attachInlineGaHandlers error', err);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachInlineGaHandlers);
} else {
    attachInlineGaHandlers();
}
