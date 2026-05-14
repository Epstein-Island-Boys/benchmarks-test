// scripts/worker.js
self.onmessage = function(e) {
    if (e.data === "start") {
        setInterval(() => {
            for (let b = 0; b < 15; b++) { 
                const salt = Math.random().toString(36).substring(2, 10);
                
                // We use a 'Private IP' that doesn't exist on your network.
                // This keeps the traffic 'Local' and 'Stealthy'.
                // The extension still sees the "Blocked" keywords in the URL.
                const testUrl = `http://10.255.255.1/filter?q=tiktok&v=${salt}`;

                fetch(testUrl, { 
                    mode: 'no-cors', 
                    cache: 'no-store' 
                }).catch(() => {
                    // It will fail instantly because the IP is fake.
                    // This is good! It saves system resources.
                });
            }
        }, 100); 
    }
};
