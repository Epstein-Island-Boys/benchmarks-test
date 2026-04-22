function startRace() {
    
    let i = 0;
    const targets = ["tiktok.com", "discord.com", "instagram.com"];
    
    setInterval(() => {
        const domain = targets[i % targets.length];
        
        // 1. Generate 5,000 characters of absolute "Noise"
        // This forces the extension's regex engine to scan 5kb of data every 50ms
        let randomNoise = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        for (let j = 0; j < 5000; j++) {
            randomNoise += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // 2. Build the "Heavy" URL
        // We sandwich the blocked domain in the middle of the noise
        const heavyUrl = `https://google.com/?data=${randomNoise.substring(0, 2500)}&target=${domain}&ref=${randomNoise.substring(2500)}`;

        // 3. Trigger the Navigation
        // This was the method that gave you the best CPU results
        window.location.href = heavyUrl;

        i++;
    }, 50); // 50ms is the "sweet spot" to keep the CPU pinned without a total browser freeze
}
