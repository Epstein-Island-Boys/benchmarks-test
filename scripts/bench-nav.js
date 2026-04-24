let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // To hit 100-200% CPU on the extension, we run a mini-burst 
        // for every single 'tick' from the worker.
        for (let burst = 0; burst < 10; burst++) {
            const domain = targets[i % targets.length];
            const junk = "A1B2C3D4E5".repeat(500); 
            const salt = Math.random().toString(16);

            // We use 'fetch' to a non-existent endpoint on your own domain.
            // This triggers the extension's 'onBeforeRequest' and 'webRequest' 
            // listeners without Chrome ever having to render a new page.
            const testUrl = `${window.location.origin}/check?target=${domain}&data=${junk}&v=${salt}`;

            // 'mode: no-cors' keeps Chrome from doing complex security checks
            // 'cache: no-store' forces the extension to look at it every time
            fetch(testUrl, { mode: 'no-cors', cache: 'no-store' })
                .catch(() => { /* Silence errors to keep console clean */ });

            i++;
        }
    };
}
