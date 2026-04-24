let i = 0;

function startRace() {
    const engine = new Worker('scripts/worker.js');
    engine.postMessage("start");

    engine.onmessage = function() {
        // We send a burst of messages directly to the extension ID
        // Replace 'YOUR_EXTENSION_ID_HERE' with your actual ID from chrome://extensions
        const extId = "YOUR_EXTENSION_ID_HERE"; 

        for (let b = 0; b < 40; b++) {
            const junk = "DATA_STRESS_".repeat(200);
            
            // This is the key: chrome.runtime.sendMessage is 
            // handled internally by the extension, NOT the browser's network stack.
            try {
                chrome.runtime.sendMessage(extId, {
                    action: "RESCAN_PAGE",
                    payload: junk,
                    timestamp: Date.now() + i
                }, () => {
                    // We don't even provide a callback body to keep it fast
                    if (chrome.runtime.lastError) { /* ignore */ }
                });
            } catch (e) {
                // If the ID is wrong, it still hits the internal dispatcher
            }
            i++;
        }
    };

    document.body.innerHTML = "<h1>Logic Stress Active</h1><p>Browser should stay quiet.</p>";
}
