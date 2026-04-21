function startOverlayTest() {
    console.log("Testing UI Override...");
    // Some filters inject a div to hide content. 
    // We try to force our own content to stay on top of EVERYTHING.
    const escapeHatch = document.createElement('div');
    escapeHatch.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 2147483647; background: white; color: black;
        display: flex; align-items: center; justify-content: center;
    `;
    escapeHatch.innerHTML = "<h1>If you see this, the block screen is hidden behind me.</h1>";
    document.documentElement.appendChild(escapeHatch);
}
