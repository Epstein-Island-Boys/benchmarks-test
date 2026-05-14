// worker.js - Precision Load Testing Script
self.onmessage = function(e) {
    if (e.data === "start") {
        // We use a faster interval but a much smaller loop to avoid 
        // triggering system-wide lag while keeping the extension busy.
        setInterval(() => {
            for (let i = 0; i < 4; i++) { 
                // Using a unique ID and timestamp to bypass extension caches
                const testId = self.crypto.randomUUID();
                const timestamp = Date.now();
                
                // A longer, more complex URL forces the extension to spend 
                // more time running its regex/filtering patterns.
                const testUrl = `http://10.255.255.1/auth/verify/status?session=${testId}&time=${timestamp}&check=true`;

                fetch(testUrl, { 
                    mode: 'no-cors', 
                    cache: 'no-store',
                    credentials: 'omit'
                }).catch(() => {
                    // Silent catch: the IP is non-existent to keep traffic 
                    // local and avoid hitting actual network firewalls.
                });
            }
        }, 40); // 40ms is roughly 25 times per second
    }
};
