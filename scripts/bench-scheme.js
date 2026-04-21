function startSchemeTest() {
    console.log("Testing Scheme Vulnerabilities...");
    // We create a "page within a page" that doesn't have a standard URL.
    const blobContent = `
        <html><body><h1>If you see this, the filter didn't catch a Blob URL</h1></body></html>
    `;
    const blob = new Blob([blobContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // We attempt to open this "hidden" URL
    window.location.href = url;
}
