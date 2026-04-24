let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    // Create 10 invisible anchors for the extension to monitor
    for(let j=0; j<10; j++) {
        const link = document.createElement('a');
        link.id = `monitor-link-${j}`;
        link.style.display = 'none';
        document.body.appendChild(link);
    }

    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // A burst of 15 changes per worker tick
        for (let b = 0; b < 15; b++) {
            const domain = targets[i % targets.length];
            const junk = "A1B2C3D4E5".repeat(500);
            const salt = Math.random().toString(36).substring(2, 10);
            
            // Pick one of our 10 links to update
            const el = document.getElementById(`monitor-link-${b % 10}`);
            
            // This triggers 'MutationObservers' and 'Content Script' logic
            // without actually navigating or fetching anything.
            el.href = `https://www.google.com/search?q=${domain}&data=${junk}&v=${salt}`;
            el.title = `Check-${salt}`; // Adding a second attribute for more load
            
            i++;
        }
    };
}
