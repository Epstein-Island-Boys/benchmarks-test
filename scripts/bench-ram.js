function startRamTest() {
    // 1. Open a new blank window to contain the "Memory Bomb"
    const stressWin = window.open("", "StressTest", "width=200,height=200");
    
    if (!stressWin) {
        alert("Please allow popups for this site!");
        return;
    }

    stressWin.document.write("<h1>RAM Stress Active...</h1><p>Watch Task Manager.</p>");

    // 2. Start the allocation in the NEW window
    let pressure = [];
    stressWin.setInterval(() => {
        try {
            // We use a smaller loop with bigger chunks to bypass the "Script Hang" detector
            for (let i = 0; i < 50; i++) {
                pressure.push(new Uint8Array(10 * 1024 * 1024).fill(1)); // 10MB chunks
            }
        } catch (e) {
            // If the tab crashes, the extension test is over.
        }
    }, 500); 
}
