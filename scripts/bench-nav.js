let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // --- 5,000 CHARACTER DATA BLOCK ---
        // This is the part that tests the extension's processing speed.
        let randomData = "";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let j = 0; j < 5000; j++) {
            randomData += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // --- THE "STABLE" URL ---
        // We use a different "Path" every time to keep it from getting stuck.
        // Changing the 'v=' number tells the browser this is a fresh event.
        const testUrl = `https://www.google.com/search?q=${domain}&test=${randomData}&v=${i}`;

        // Trigger the change
        window.location.href = testUrl;

        i++;
    };
}
