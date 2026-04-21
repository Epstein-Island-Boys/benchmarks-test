// This variable stays alive as long as the tab is open
let permanentLoad = [];

function startRamTest() {
    // Visual feedback on the button
    const btn = event.target;
    btn.innerText = "RAM Pressure Increasing...";
    btn.style.background = "#e67e22";

    setInterval(() => {
        try {
            // We create 50MB chunks of data
            // Uint8Array is "unmanaged" memory, making it harder for GC to clear
            let chunk = new Uint8Array(50 * 1024 * 1024).fill(Math.random() * 255);
            
            // CRITICAL: We push it to the global array so Chrome CANNOT delete it
            permanentLoad.push(chunk);
            
        } catch (e) {
            btn.innerText = "TAB CRASHED (OOM)";
            btn.style.background = "red";
        }
    }, 200); // Adds 50MB every 0.2 seconds (250MB/sec)
}
