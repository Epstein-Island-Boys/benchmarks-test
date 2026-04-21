function startRace() {
    // We use a list of common "Unblocked" domains to hide the "Blocked" one
    const safeBase = ["google.com", "bing.com", "wikipedia.org", "nasa.gov"];
    const targetBase = "tiktok.com"; // Your blocked target
    let i = 0;

    setInterval(() => {
        // Every 5th request, we try the blocked site. 
        // The other 4 are "Safe" but "Heavy" to distract the filter.
        let domain = (i % 5 === 0) ? targetBase : safeBase[i % safeBase.length];
        
        // Generate a random "Poison" string
        // This forces the extension to run its Regex logic every single time.
        const poison = Math.random().toString(36).substring(2, 15);
        const heavyData = "X".repeat(2000); 
        
        // We use window.location.replace so we don't clog your "Back" button history
        // but it still counts as a full navigation event.
       // A messy string full of symbols is much harder for a filter to scan than plain letters.
        const messyData = (Math.random().toString(36) + "!@#$%^&*()_+").repeat(200);
        
        const finalUrl = `https://${domain}/?id=${i}&data=${messyData}&path=${"../".repeat(100)}test`;
        
        window.location.replace(finalUrl);
        i++;
    }, 50); // 50ms is the "Sweet Spot" for Service Worker saturation
}
