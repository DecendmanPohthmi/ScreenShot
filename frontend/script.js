document.getElementById('screenshot-btn').addEventListener('click', () => {
    console.log("Requesting screenshot...");

    // ✅ Open the download link in a new tab
    window.open('https://screenshot-backend-iubs.onrender.com/screenshot', '_blank');

    console.log("Screenshot requested!");
});
