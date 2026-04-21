let cluster = new Map();
let i = 0;

function startRamTest() {
    // We use a faster interval but smaller chunks (1MB)
    // This bypasses the "Large Allocation" warning in Chrome
    setInterval(() => {
        try {
            // Create a unique key so the Map can't overwrite old data
            let key = "void_" + i;
            
            // Create a 1MB "Blob" of random data
            // Randomization prevents Chrome from compressing the memory
            let data = new Uint8Array(1024 * 1024).map(() => Math.floor(Math.random() * 255));
            
            // Lock it into the Map
            cluster.set(key, data);
            
            i++;
            
            // Every 100 chunks (~100MB), we trigger a small DOM change
            // This forces the extension to re-scan the page while memory is high
            if (i % 100 === 0) {
                document.body.style.backgroundColor = (i % 200 === 0) ? "#1a1a1a" : "#1b1b1b";
            }
        } catch (e) {
            // If we hit the limit, the tab will naturally freeze
        }
    }, 50); // Adds 1MB every 50ms (Approx 1.2GB per minute)
