let i = 0;

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // We do a burst of 20 "Probes" per tick
        for (let b = 0; b < 20; b++) {
            const salt = Math.random().toString(36).substring(2, 10);
            
            // We use a 'Blocked' keyword in the URL.
            // Since it's a 'fetch', Chrome doesn't reload the page (Low CPU),
            // but the extension MUST intercept it to see if it should block it.
            const testUrl = `https://www.google.com/search?q=tiktok&test=${salt}`;

            fetch(testUrl, { 
                mode: 'no-cors', // Keeps Chrome from doing complex security checks
                cache: 'no-store' // Forces the extension to look at it every time
            }).catch(() => {
                // We expect this to fail or be blocked, so we just catch the error
            });

            i++;
        }
    };
}
