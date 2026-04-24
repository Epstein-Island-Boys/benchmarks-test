let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // Pattern Breaker: Every 50 iterations, we do a "Harder" change
        // to wake up the extension's listeners.
        const forceWake = (i % 50 === 0);
        
        for (let b = 0; b < 30; b++) {
            const domain = targets[i % targets.length];
            const junk = "A1B2C3D4E5".repeat(500);
            const salt = Math.random().toString(36);

            // Switching between 'search' and 'about' formats 
            // keeps the extension's logic "fresh" and alert.
            const path = forceWake ? "/about/" : "/search";
            const url = `https://www.google.com${path}?q=${domain}&data=${junk}&v=${salt}`;
            
            window.history.pushState({}, '', url);

            i++;
        }
    };
}
