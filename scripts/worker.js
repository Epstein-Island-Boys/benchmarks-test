// worker.js
self.onmessage = function() {
    setInterval(() => {
        self.postMessage("pulse");
    }, 50); 
};
