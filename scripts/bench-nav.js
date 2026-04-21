function startRace() {
    let i = 0;
    const targets = ["tiktok.com", "discord.com", "instagram.com"];
    
    setInterval(() => {
        const domain = targets[i % targets.length];
        
        // 1. Generate 5,000 characters of total randomness
        // Using Math.random().toString(36) in a loop creates a very "noisy" string
        let junk = "";
        while (junk.length < 5000) {
            junk += Math.random().toString(36).substring(2);
        }
        // Trim to exactly 5k
        junk = junk.substring(0, 5000);

        // 2. Build the URL
        // We put the blocked domain in the middle to see if the filter 
        // can find it inside the 5,000 character "haystack"
        const testUrl = `?query=${junk.substring(0, 2500)}&target=${domain}&data=${junk.substring(2500)}`;

        // 3. Push to history
        // This triggers the extension's listeners without reloading the page
        window.history.pushState({state: i}, "", testUrl);

        i++;
    }, 40); // 40ms is a good balance to prevent the browser from lagging
}
