/**
 * bench-nav.js
 * High-Entropy Navigation Stress Test
 * Designed to test extension interceptor latency.
 */

let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com", "snapchat.com"];

function startRace() {
    console.log("Race started. Initializing Web Worker...");

    // 1. Initialize the background worker to prevent tab throttling
    const myWorker = new Worker('scripts/worker.js');
    
    // 2. Start the pulse
    myWorker.postMessage("start");

    // 3. This block executes every time the worker "ticks"
    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // --- 5,000 CHARACTER RANDOMIZER (The "Regex Trap") ---
        // Generates high-entropy noise to force deep string inspection
        let randomNoise = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        for (let j = 0; j < 5000; j++) {
            randomNoise += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // --- URL CONSTRUCTION ---
        // We sandwich the domain in the middle of 5kb of noise.
        // This forces the extension to scan the entire string.
        const heavyUrl = `https://google.com/?data=${randomNoise.substring(0, 2500)}&target=${domain}&ref=${randomNoise.substring(2500)}`;

        // --- TRIGGER NAVIGATION ---
        // Using .href was verified as the most effective method for high CPU.
        window.location.href = heavyUrl;

        i++;
    };
}
