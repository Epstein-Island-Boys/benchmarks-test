let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // 5,000 characters of high-entropy data
        const junk = "A1B2C3D4E5".repeat(500); 
        const salt = Math.random().toString(36).substring(2, 10);

        // --- TARGETED NAVIGATION ---
        // By using 'test-bench://', we trigger the extension's URL scanner.
        // Chrome won't try to 'render' this, so your CPU won't lock up,
        // but the extension has to decide if 'test-bench' + 'tiktok.com' is allowed.
        const testUrl = b'chrome-extension://ckecmkbnoanpgplccmnoikfmpcdladkc/manifest.json?q=' + domain + junk;

        window.location.href = testUrl;

        i++;
    };
}
