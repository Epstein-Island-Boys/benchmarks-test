let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    // We create a "hidden" container to hold our test elements
    const container = document.createElement('div');
    container.style.display = 'none';
    document.body.appendChild(container);

    // Create 10 permanent link shells
    for(let j=0; j<10; j++) {
        const a = document.createElement('a');
        a.id = `link-${j}`;
        container.appendChild(a);
    }

    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // Every "tick", we rapidly cycle the attributes of the links.
        // This triggers the Extension's DOM observers/scanners.
        for (let b = 0; b < 15; b++) {
            const domain = targets[i % targets.length];
            const junk = "A1B2C3D4E5".repeat(500);
            const salt = Math.random().toString(36).substring(2, 10);
            
            const el = document.getElementById(`link-${b % 10}`);
            
            // This is the core of the test: 
            // Changing 'href' and 'title' attributes is a signal the 
            // extension usually intercepts to check for blocked sites.
            el.href = `https://www.google.com/search?q=${domain}&v=${salt}`;
            el.title = junk; // Adding the heavy data here
            
            i++;
        }
    };
}
