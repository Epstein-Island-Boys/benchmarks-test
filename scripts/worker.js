// scripts/worker.js
self.onmessage = function(e) {
    if (e.data === "start") {
        // Just a steady pulse to wake up the main script
        setInterval(() => {
            self.postMessage("tick");
        }, 15); // 15ms is fast but stable
    }
};
