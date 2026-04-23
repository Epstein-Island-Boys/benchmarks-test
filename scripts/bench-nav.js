let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // This check ensures the script continues even if the tab is 'hidden'
        const domain = targets[i % targets.length];
        
        // 5,000 character data block for processing stress
        let randomData = "";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let j = 0; j < 5000; j++) {
            randomData += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // We use a unique 'v' parameter to ensure the navigation event 
        // is always treated as a new task by your extension's listeners.
        const testUrl = `https://www.google.com/search?q=${domain}&test=${randomData}&v=${Date.now()}`;

        // Standard navigation trigger
        window.location.href = testUrl;

        i++;
    };
}
