let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com", "snapchat.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        const domain = targets[i % targets.length];
        
        // --- 5,000 CHARACTER RANDOMIZER ---
        let randomNoise = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        for (let j = 0; j < 5000; j++) {
            randomNoise += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // --- THE "STAY-ALIVE" URL ---
        // By using location.hash (#), we tell the browser "Don't leave the page"
        // But the extension still sees a massive new URL and has to scan it.
        const stressUrl = `#test?data=${randomNoise.substring(0, 2500)}&target=${domain}&ref=${randomNoise.substring(2500)}`;

        // This triggers the extension's 'onUpdated' listener every time
        window.location.hash = stressUrl;

        i++;
    };
}
