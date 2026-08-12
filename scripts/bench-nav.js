// scripts/bench-nav.js
function startRace() {
    const engine = new Worker('scripts/worker.js');
    engine.postMessage("start");

    document.body.innerHTML = "<h1>Worker Active. Stressing Extension Listeners...</h1>";
    console.log("Stress test started.");
}
