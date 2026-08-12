// scripts/bench-nav.js
function startRace() {
    // Launching the worker engine
    const engine = new Worker('scripts/worker.js');[cite: 1]
    engine.postMessage("start");[cite: 1]

    // Clear the UI to keep Browser CPU at absolute minimum
    document.body.innerHTML = "<h1>Worker Active. Stress Test Running...</h1>";[cite: 1]
    console.log("Stress test moved to background thread.");[cite: 1]
}
