function startRace() {
    let i = 0;
    const targets = ["tiktok.com", "discord.com", "instagram.com"];
    
    // We use a faster interval but keep the logic "Light" so the browser doesn't freeze
    setInterval(() => {
        const domain = targets[i % targets.length];
        
        // 1. Create a unique ID and a "Messy" string for the Regex scanner
        const salt = Math.random().toString(36).substring(2, 10);
        const noise = "!@#$".repeat(25) + i; // Symbols are harder to parse than letters

        // 2. We use URL Search Params. 
        // This keeps the "Race" alive on the current page without a full freeze.
        const testUrl = `?target=${domain}&auth=${salt}&payload=${noise}`;

        // 3. Update the URL without a full page reload.
        // This forces the extension's 'onUpdated' and 'onHistoryStateUpdated' 
        // listeners to fire constantly at 30ms intervals.
        window.history.pushState({state: i}, "", testUrl);

        i++;
    }, 30); 
}
