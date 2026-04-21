function startRamTest() {
    let junk = [];
    try {
        setInterval(() => {
            for (let i = 0; i < 1000; i++) {
                // This does the heavy lifting, no logging needed
                junk.push(new Array(1000000).fill("STRESS"));
            }
        }, 100);
    } catch (e) {
        // Fail silently
    }
}
