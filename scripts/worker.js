// worker.js - The "Ghost Pulse" Test
self.onmessage = function(e) {
    if (e.data === "start") {
        // 15 seconds gives the Chromebook plenty of time to recover 
        // between pulses, keeping the UI smooth.
        setInterval(() => {
            
            // Instead of a full Fetch, we use a 'no-cors' request to a 
            // non-existent local file. This is the lightest possible 
            // trigger for an extension's 'onBeforeRequest' listener.
            const tinyId = Math.random().toString(36).substring(7);
            const testUrl = `http://localhost/poll?id=${tinyId}`;

            fetch(testUrl, { 
                mode: 'no-cors',
                priority: 'low' // Tells Chrome this isn't important
            }).catch(() => {});
            
            // Optional: Log to console so you know when it happens
            // console.log("Ghost Pulse sent.");
            
        }, 15000); 
    }
};
