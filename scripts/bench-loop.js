function startLoop() {
    console.log("Starting Recursive Logic Test...");
    // This flips the hash rapidly, but we're going to try to trigger 
    // the extension's 'URL Scanner' over and over on the same string.
    let target = window.location.href;
    for (let i = 0; i < 1000; i++) {
        // We push state changes to the history stack. 
        // A filter often tries to re-verify every history change.
        window.history.pushState({}, '', `?test=${i}`);
    }
}
