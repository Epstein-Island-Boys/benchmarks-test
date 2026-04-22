// scripts/bench-nav.js
let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    // 1. Initialize the worker
    const myWorker = new Worker('scripts/worker.js');
    
    // 2. Tell the worker to start the clock
    myWorker.postMessage("start");

    // 3. This runs every time the worker says "tick" (even in the background)
    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];

        // Force the extension to handle storage sync events while it's navigating
        for (let j = 0; j < 50; j++) {
            chrome.storage.local.set({ ["stress_" + i + "_" + j]: "A".repeat(1000) });
        }
        // Note: If 'chrome' is undefined in your GitHub tab, use this instead:
        window.localStorage.setItem("stress_" + i, "A".repeat(5000));
        
        // Your 5,000 character Randomizer
        let randomNoise = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        for (let j = 0; j < 5000; j++) {
            randomNoise += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const heavyUrl = `https://google.com/?data=${randomNoise.substring(0, 2500)}&target=${domain}&ref=${randomNoise.substring(2500)}`;

        // Trigger the navigation that hit 37%
        window.location.href = heavyUrl;

        i++;
    };
}
