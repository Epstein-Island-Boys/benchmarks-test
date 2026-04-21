function startRace() {
    let i = 0;
    const targets = ["tiktok.com", "instagram.com", "discord.com"];

    setInterval(() => {
        // 1. Pick a different target domain every time
        let domain = targets[i % targets.length];

        // 2. GENERATE A RANDOM SUBDOMAIN
        // This is the "secret sauce." If you go to a.google.com then b.google.com,
        // Chrome treats them as separate DNS/logic events, bypassing the cache.
        let sub = Math.random().toString(36).substring(2, 5);

        // 3. ADD RANDOM "NOISE" CHARACTERS
        // We use symbols that are expensive for the extension's regex to parse.
        let noise = Array.from({length: 20}, () => 
            String.fromCharCode(33 + Math.random() * 94)).join('');

        // 4. THE URL CONSTRUCTION
        // By changing the subdomain AND the path, Chrome can't "throttle" the load.
        let freshUrl = `https://${sub}.${domain}/?cache_bust=${Date.now()}&noise=${encodeURIComponent(noise)}`;

        // Use window.location.href instead of replace to force a hard state change
        window.location.href = freshUrl;
        
        i++;
    }, 75); // Slightly slower interval allows the "Fresh" load to actually hit the CPU
}
