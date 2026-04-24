// scripts/worker.js
self.onmessage = function(e) {
    if (e.data === "start") {
        setInterval(() => {
            self.postMessage("pulse");
        }, 15); // Faster pulse, but lighter work
    }
};
