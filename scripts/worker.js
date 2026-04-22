// scripts/worker.js
self.onmessage = function(e) {
    if (e.data === "start") {
        setInterval(() => {
            // Sends a signal back to the main script every 40ms
            self.postMessage("tick");
        }, 40); 
    }
};
