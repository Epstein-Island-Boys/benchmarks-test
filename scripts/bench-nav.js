// worker.js - Network Listener Stress Test
self.onmessage = function(e) {
    if (e.data === "start") {
        
        // Target a local port where a lightweight server is running
        const targetHost = "http://127.0.0.1:8080";
        
        // Adjust interval (ms) and batchSize to test your extension's limits
        const intervalMs = 100; // Fires 10 times per second
        const batchSize = 5;    // Sends 5 concurrent requests per interval

        setInterval(() => {
            for (let i = 0; i < batchSize; i++) {
                const id = Math.random().toString(36).substring(7);
                
                fetch(`${targetHost}/test-intercept?id=${id}`, {
                    mode: 'no-cors',
                    priority: 'high'
                }).catch(() => {});
            }
        }, intervalMs);
    }
};
