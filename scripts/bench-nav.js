let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // --- PRE-COMPUTED DATA BLOCK ---
        // We use a static block with a tiny random 'salt' 
        // to keep Chrome's string-building CPU usage near 0%.
        const junk = "A1B2C3D4E5".repeat(500); 
        const salt = Math.random().toString(36).substring(2, 6);

        // --- THE "NULL" NAVIGATION ---
        // By using '#' followed by the domain and 5000 characters,
        // we trigger the extension's listeners without making Chrome 
        // load a new website or render a search result.
        const stressUrl = `#test?q=${domain}&data=${junk}&v=${salt}`;

        // This keeps the CPU focus on the Extension's logic
        window.location.hash = stressUrl;

        i++;
    };
}
