document.getElementById('screenshot-btn').addEventListener('click', () => {
    console.log("Requesting screenshot...");

    // ✅ Open the download link in a new tab
    window.open('http://localhost:3000/screenshot', '_blank');

    console.log("Screenshot requested!");
});
