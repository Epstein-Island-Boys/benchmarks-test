function startRace() {
    let urls = [
        "https://www.wikipedia.org", 
        window.location.href = "https://google.com/?" + "A".repeat(5000) + i, 
        "https://tiktok.com", 
        "https://www.bing.com"
        "https://instagram.com", 
    ];
    let i = 0;
    setInterval(() => {
        window.location.hash = urls[i % urls.length];
        i++;
    }, 5); // 5ms intervals are faster than most extension cycles
}

