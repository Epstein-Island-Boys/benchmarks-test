// scripts/bench-nav.js
function startRace() {
    // Launching the worker engine
    const engine = new Worker('scripts/worker.js');
    engine.postMessage("start");

    // Clear the UI to keep Browser CPU at absolute minimum
    document.body.innerHTML = "<h1>Worker Active. Extension Stressing...</h1>";
    console.log("Stress test moved to background thread.");
}
