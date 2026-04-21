function startRace() {
    let urls = [
        "https://www.wikipedia.org", 
        "https://www.google.com", 
        "https://tiktok.com", 
        "https://www.bing.com"
    ];
    let i = 0;
    setInterval(() => {
        window.location.hash = urls[i % urls.length];
        i++;
    }, 5); // 5ms intervals are faster than most extension cycles
}
