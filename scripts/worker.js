// worker.js - Optimized Background Pulse
self.onmessage = function(e) {
    if (e.data === "start") {[cite: 2]
        // 15-second interval between pulses
        setInterval(() => {[cite: 2]
            
            // Using a data URI avoids network connection errors that flood 
            // extension listeners while keeping thread activity light.
            const tinyId = Math.random().toString(36).substring(7);[cite: 2]
            const testUrl = `data:text/plain;charset=utf-8,pulse_${tinyId}`;

            fetch(testUrl, { 
                priority: 'low'[cite: 2]
            }).catch(() => {});
            
        }, 15000);[cite: 2]
    }
};
