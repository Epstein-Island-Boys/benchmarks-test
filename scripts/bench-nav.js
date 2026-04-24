let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // --- 5,000 CHARACTER DATA BLOCK ---
        // Using a high-density string to ensure the extension has to 
        // perform a deep scan of the URL.
        const junk = "A1B2C3D4E5".repeat(500); 
        const salt = Date.now();

        // --- THE SELF-REFERENCING URL ---
        // We stay on the current page (window.location.pathname) 
        // but add the 'domain' and 'junk' as search parameters.
        // This is a standard, valid web behavior that Chrome won't block.
        const testUrl = `${window.location.pathname}?q=${domain}&data=${junk}&v=${salt}`;

        window.location.href = testUrl;

        i++;
    };
}
