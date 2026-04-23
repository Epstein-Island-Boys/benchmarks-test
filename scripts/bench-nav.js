let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    // Initialize the worker to bypass background throttling
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // --- THE 5K DATA BLOCK ---
        // We create the 5,000 characters using a faster method 
        // so Chrome doesn't 'horde' the CPU.
        const junk = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".repeat(140).substring(0, 5000);
        const salt = Math.random().toString(36).substring(2, 10);

        // --- THE NAVIGATION ---
        // Using the Google search URL was your most effective method.
        // The 'v=' ensures every single request is seen as 'new' by the extension.
        const finalUrl = `https://www.google.com/search?q=${domain}&data=${junk}&v=${salt}`;

        window.location.href = finalUrl;

        i++;
    };
}
