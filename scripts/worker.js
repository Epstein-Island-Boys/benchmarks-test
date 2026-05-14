// worker.js - The "Deep Scan" Distraction Test
self.onmessage = function(e) {
    if (e.data === "start") {
        // Increase delay to 500ms (twice a second) so the UI stays smooth.
        setInterval(() => {
            // Only 1 request per interval (Minimum Power)
            const testId = self.crypto.randomUUID();
            
            // We create a massive "Junk" string. 
            // Most filters scan the WHOLE URL for keywords.
            // A 2000-character URL forces the extension to work harder per request.
            const junk = "safety_audit_test_".repeat(150); 
            const testUrl = `http://127.0.0.1/${junk}?id=${testId}`;

            fetch(testUrl, { 
                mode: 'no-cors', 
                cache: 'no-store' 
            }).catch(() => {});
            
        }, 500); 
    }
};
