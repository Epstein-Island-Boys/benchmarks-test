let i = 0;
// Replace this with your actual Extension ID
const EXT_ID = "ckecmkbnoanpgplccmnoikfmpcdladkc";
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // High-entropy data string
        const junk = "A1B2C3D4E5".repeat(500); 
        const salt = Date.now();

        // --- TARGETED INTERNAL NAVIGATION ---
        // We navigate to a file that definitely exists inside the extension.
        // We append the 'target' and 'junk' as query parameters.
        // This forces the extension to analyze the request to its own files.
        const testUrl = `chrome-extension://${EXT_ID}/manifest.json?target=${domain}&data=${junk}&v=${salt}`;

        window.location.href = testUrl;

        i++;
    };
}
