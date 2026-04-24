let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    // We use your original lightweight worker
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // We run a high-speed burst of "Virtual Navigations"
        for (let b = 0; b < 40; b++) {
            const domain = targets[i % targets.length];
            const junk = "A1B2C3D4E5".repeat(500);
            const salt = Math.random().toString(36).substring(2, 10);

            // This is the winner: It changes the URL without a page reload.
            // Chrome's CPU stays low, but the Extension's 'onUpdated' 
            // and 'URL Listeners' fire every single time.
            const testUrl = `https://www.google.com/search?q=${domain}&data=${junk}&v=${salt}`;
            
            window.history.pushState({}, '', testUrl);

            i++;
        }
    };
}
