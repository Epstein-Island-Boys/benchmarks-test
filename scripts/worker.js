// scripts/worker.js
self.onmessage = function(e) {
    if (e.data === "start") {
        setInterval(() => {
            // KNOB 1: THE BURST (Current: 25)
            // Lower this to 5 or 10. 
            // This is how many requests are fired at the EXACT same time.
            for (let b = 0; b < 10; b++) { 
                // Inside your worker loop
                const uniqueID = crypto.randomUUID(); // Generates a totally unique string
                const testUrl = `https://www.google.com/search?q=tiktok&id=${uniqueID}&t=${Date.now()}`;

                fetch(testUrl, { 
                    mode: 'no-cors', 
                    cache: 'no-store' 
                }).catch(() => {});
            }
            
        }, 150); // KNOB 2: THE INTERVAL (Current: 30)
                 // Increase this to 150 or 200.
                 // This is the delay (in milliseconds) between bursts.
    }
};
