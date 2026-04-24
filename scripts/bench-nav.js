function startRace() {
    console.log("Launching Engines...");
    
    // Launching 4 parallel worker threads
    for (let i = 0; i < 4; i++) {
        const engine = new Worker('scripts/worker.js');
        engine.postMessage("start");
    }

    // Optional: Visual confirmation that the tab is "Quiet"
    document.body.innerHTML = "<h1>Engines Running. Check Extension CPU.</h1>";
}
