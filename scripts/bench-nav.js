let i = 0;

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // We increase the burst to 50 for max intensity
        for (let b = 0; b < 50; b++) {
            // Generate a random-looking IP address
            const r1 = Math.floor(Math.random() * 255);
            const r2 = Math.floor(Math.random() * 255);
            
            // This URL looks like a direct server connection
            // Extensions MUST scan these because they look like proxy bypasses.
            const targetIp = `http://192.168.${r1}.${r2}`;
            const junk = "X1Y2Z3".repeat(800); 
            const salt = Date.now() + b;

            // pushState keeps Chrome's CPU low (no reload)
            // but it updates the address bar so the extension triggers.
            const testUrl = `${targetIp}/?q=tiktok.com&data=${junk}&v=${salt}`;
            
            window.history.pushState({}, '', testUrl);

            i++;
        }
    };
}
