// worker.js - The "Manual Pulse" Test
self.onmessage = function(e) {
    if (e.data === "pulse") {
        // We only send 1 single request per click.
        // This is the absolute minimum power possible.
        const testId = self.crypto.randomUUID();
        const junk = "verification_".repeat(20); 
        const testUrl = `http://127.0.0.1/${junk}?id=${testId}`;

        fetch(testUrl, { 
            mode: 'no-cors', 
            cache: 'no-store' 
        }).catch(() => {});
        
        console.log("Pulse sent. Test the blocked site now.");
    }
};
