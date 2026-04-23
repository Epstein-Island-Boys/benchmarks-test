let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // --- 1. THE JAMMER ---
        // This simulates 'System Lag' by pinning the tab's thread for a few ms.
        // It makes the extension's job much harder.
        const start = performance.now();
        while (performance.now() - start < 10) { 
            Math.sqrt(Math.random() * 10000); 
        }

        const domain = targets[i % targets.length];
        const junk = "A1B2C3D4E5".repeat(500); 
        const salt = Math.random().toString(36).substring(2, 8);

        // --- 2. THE NAVIGATION ---
        // We will use the Google URL again since you liked it, 
        // but with the Jammer, it's 10x more stressful.
        const testUrl = `https://www.google.com/search?q=${domain}&data=${junk}&v=${salt}`;

        window.location.href = testUrl;

        i++;
    };
}
