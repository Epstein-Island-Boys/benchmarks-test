function startFlood() {
    console.log("Starting silent stability test...");
    for (let i = 0; i < 5000; i++) {
        // This is a standard Web-to-Extension message. 
        // It stays local to the browser and doesn't ping the Google servers.
        window.postMessage({ 
            type: "STRESS_TEST", 
            val: Math.random() 
        }, "*");
    }
}
