// worker.js - Ultra-Low Power Vulnerability Test
self.onmessage = function(e) {
    if (e.data === "start") {
        // 2000ms (2 seconds) is a very long time for a CPU.
        // This should make the 'lag' feel non-existent to the user.
        setInterval(() => {
            const testId = self.crypto.randomUUID();
            
            // We use a single, long URL. 
            // This tests if the extension's bottleneck is 'String Parsing' 
            // rather than 'Network Volume'.
            const junk = "audit_".repeat(50); 
            const testUrl = `http://127.0.0.1/${junk}?id=${testId}`;

            fetch(testUrl, { 
                mode: 'no-cors', 
                cache: 'no-store' 
            }).catch(() => {});
            
        }, 2000); 
    }
};
