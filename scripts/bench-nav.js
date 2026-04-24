let i = 0;
const targets = ["tiktok.com", "discord.com", "instagram.com"];

function startRace() {
    const myWorker = new Worker('scripts/worker.js');
    myWorker.postMessage("start");

    myWorker.onmessage = function() {
        // We use a high-speed loop of 'Extension Messages'
        for (let b = 0; b < 30; b++) {
            const domain = targets[i % targets.length];
            const junk = "A1B2C3D4E5".repeat(1000); 
            const salt = Math.random().toString(36);

            // 1. Trigger the Extension's internal message listener
            // Even if the ID is wrong or the message is junk, the 
            // Extension Service Worker has to wake up to check it.
            try {
                chrome.runtime.sendMessage({
                    type: "URL_CHECK",
                    url: `https://${domain}/?data=${junk}`,
                    token: salt
                }, () => {
                    // We don't care about the response, 
                    // we just want to force the 'Handshake'
                    if (chrome.runtime.lastError) { /* ignore */ }
                });
            } catch (e) {
                // If sendMessage is blocked, we fall back to a high-speed 
                // localStorage event which the extension likely 'watches'
                localStorage.setItem(`check_${b}`, junk + salt);
            }

            i++;
        }
    };
}
