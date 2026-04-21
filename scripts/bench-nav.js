async function startRace() {
    const targets = ["tiktok.com", "discord.com", "instagram.com", "snapchat.com"];
    let i = 0;

    // The "Engine" - Using a recursive async function to bypass interval throttling
    async function runPulse() {
        const domain = targets[i % targets.length];
        
        // 1. Generate a massive, high-entropy string
        const entropy = Array.from({length: 100}, () => 
            Math.random().toString(36)).join('-');

        // 2. The "Deep Path" Attack
        // Extensions often struggle with very long directory paths
        const deepPath = "/security/audit/test/".repeat(20);

        const testUrl = `https://test-${Math.random().toString(36).substring(7)}.${domain}${deepPath}?data=${entropy}`;

        // 3. Trigger the navigation
        // We use .replace() to keep the browser from getting stuck in history-loop lag
        window.location.replace(testUrl);

        i++;

        // 4. The "Pulse" - using a tiny timeout to keep the CPU pinned
        // but allowing just enough time for the Extension to register the event.
        setTimeout(runPulse, 40); 
    }

    runPulse();
}
