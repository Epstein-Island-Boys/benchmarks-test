let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    // We stick with the existing worker you have to keep the pulse steady
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // --- 5,000 CHARACTER DATA BLOCK ---
        // Pre-calculated to keep the Main Thread CPU usage as low as possible
        const junkData = "X1Y2Z3A4B5".repeat(500); 

        // --- THE ACTIVE NAVIGATION ---
        // Using 'window.location.href' with the Google search format.
        // The 'v=' uses a timestamp to ensure the browser sees it as a 
        // fresh, unique task every 40ms.
        const testUrl = `https://www.google.com/search?q=${domain}&test=${junkData}&v=${Date.now()}`;

        // Trigger the event
        window.location.href = testUrl;

        i++;
    };
}
