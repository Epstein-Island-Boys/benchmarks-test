let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // We create a "Data Stack"
        // This is a single, massive string of repeated domain keywords.
        // This is much easier for the browser to build (low CPU) 
        // but very hard for an extension to filter.
        const dataStack = (domain + " ").repeat(1000);
        const salt = Math.random().toString(36).substring(2, 10);

        // We use a Data URI. This tells the browser: "The page IS this text."
        // Most extensions have to scan the entire Data URI to ensure 
        // it isn't a workaround for a blocked site.
        const testUrl = `data:text/plain;base64,${btoa(dataStack)}#${salt}`;

        window.location.href = testUrl;

        i++;
    };
}
